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

const getContactByID = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;
      const client = await dbConnect();
      const ContactQuery = {
        text: 'SELECT * FROM contact_messages WHERE id = $1',
        values: [id],
      };
      const ContactResult = await client.query(ContactQuery);
      client.release();
      const contactDoc = ContactResult.rows[0];
      res.json({
        contactDoc
      });


    })

  } catch (error) {
    console.error('Error fetching Contact by ID:', error);
    res.status(500).json({ errorMessage: 'Error fetching Contact by ID' });
  }
};
const deleteContact = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;

      const client = await dbConnect();
      try {
        const ContactQuery = `
            SELECT * FROM contact_messages WHERE id = $1;
          `;
        const ContactValues = [id];
        const ContactResult = await client.query(ContactQuery, ContactValues);
        const ContactDoc = ContactResult.rows[0];

        if (!ContactDoc) {
          return res.status(404).json("Contact not found");
        }
        const deleteQuery = `
            DELETE FROM contact_messages WHERE id = $1;
          `;
        const deleteValues = [id];
        await client.query(deleteQuery, deleteValues);

        res.json({ message: "Contact deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error deleting Contact" });
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};

module.exports = {
  addContact,
  getContact, getContactByID,deleteContact
};