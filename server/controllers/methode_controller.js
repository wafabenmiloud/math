const jwt = require("jsonwebtoken");
const { dbConnect } = require("../db.js");


const addMethode = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ errorMessage: "No file uploaded" });
    }

    const { title, content1,content2} = req.body;
    const { token } = req.cookies;

    const imageURL = `${req.file.filename}`;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;

      const client = await dbConnect();

      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS methodes (
            id SERIAL PRIMARY KEY,
            title TEXT,
            content1 TEXT,
            content2 TEXT,
            cover TEXT
          
          );
        `);

        const query = `
          INSERT INTO methodes (title, content1, content2, cover)
          VALUES ($1, $2, $3, $4)
          RETURNING *;
        `;
        const values = [title, content1, content2, imageURL];
        const result = await client.query(query, values);
        const MethodeDoc = result.rows[0];
        res.json(MethodeDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error creating Methode" });
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const updateMethode = async (req, res) => {
  try {
    

    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, content1, content2} = req.body;

      const client = await dbConnect();
      try {
        const query = `
            SELECT * FROM methodes WHERE id = $1;
          `;
        const values = [id];
        const result = await client.query(query, values);
        const methodeDoc = result.rows[0];
        if (!methodeDoc) {
          return res.status(404).json("Methode not found");
        }
           const updateQuery = `
            UPDATE methodes 
            SET title = $1, content1 = $2, content2 = $3, cover = $4
            WHERE id = $5
            RETURNING *;
          `;
        const updateValues = [title, content1, content2, req.file ? `${req.file.filename}` : methodeDoc.cover, id];
        const updatedResult = await client.query(updateQuery, updateValues);
        const updatedMethodeDoc = updatedResult.rows[0];

        res.json(updatedMethodeDoc);
          
        
       
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error updating Methode" });
      } finally {
        client.release();
      }
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const getMethode = async (req, res) => {
  const client = await dbConnect();

  try {
    const query = `
        SELECT *
        FROM methodes 
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
    res.status(500).json({ errorMessage: "Error fetching Methodes" });
  } finally {
    client.release();
  }
};
const getMethodeByID = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;
      const client = await dbConnect();
      const methodeQuery = {
        text: 'SELECT * FROM methodes WHERE id = $1',
        values: [id],
      };
      const methodeResult = await client.query(methodeQuery);
      client.release();
      const methDoc = methodeResult.rows[0];
      res.json({
        methDoc
      });


    })

  } catch (error) {
    console.error('Error fetching Methode by ID:', error);
    res.status(500).json({ errorMessage: 'Error fetching Methode by ID' });
  }
};
const deleteMethode = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;

      const client = await dbConnect();
      try {
        const methodeQuery = `
            SELECT * FROM methodes WHERE id = $1;
          `;
        const methodeValues = [id];
        const methodeResult = await client.query(methodeQuery, methodeValues);
        const methodeDoc = methodeResult.rows[0];

        if (!methodeDoc) {
          return res.status(404).json("Methode not found");
        }
        const deleteQuery = `
            DELETE FROM methodes WHERE id = $1;
          `;
        const deleteValues = [id];
        await client.query(deleteQuery, deleteValues);

        res.json({ message: "Methode deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error deleting Methode" });
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
  addMethode,
  updateMethode,
  getMethode, getMethodeByID,
  deleteMethode
};