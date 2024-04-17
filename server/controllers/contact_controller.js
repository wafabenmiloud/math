const jwt = require("jsonwebtoken");
const { dbConnect } = require("../db.js");


const addContact = async (req, res) => {
  try {
    const { firstName, lastName, city, phoneNumber, email, message, createdAt } = req.body;
    const client = await dbConnect();

    try {
      await client.query(`
          CREATE TABLE IF NOT EXISTS contact_messages (
            id SERIAL PRIMARY KEY,
            firstName TEXT,
            lastName TEXT,
            city TEXT,
            phoneNumber TEXT,
            email TEXT,
            message TEXT,
            createdAt DATE
          
          );
        `);

      const query = `
          INSERT INTO contact_messages (firstName, lastName, city, phoneNumber, email, message, createdAt)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *;
        `;
      const values = [firstName, lastName, city, phoneNumber, email, message, createdAt];
      const result = await client.query(query, values);
      const contactDoc = result.rows[0];
      res.json(contactDoc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ errorMessage: "Error creating contact" });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};

const getContact = async (req, res) => {
try {
  const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const client = await dbConnect();
      try {
        const query = `
          SELECT *
          FROM contact_messages ORDER by createdAt
        `;
        const result = await client.query(query);
  
        if (result.rows.length === 0) {
          return res.json([]);
        }
  
        res.json(result.rows);
  
    } catch (error) {
      if (error.code === '42P01') {
        return res.json([]);
      }
  
      console.error(error);
      res.status(500).json({ errorMessage: "Error fetching contact" });
    } finally {
      client.release();
    }
    });

} catch (error) {
  console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
}
  
};



module.exports = {
  addContact,
  getContact
};