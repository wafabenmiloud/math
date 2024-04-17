const jwt = require("jsonwebtoken");
const { dbConnect } = require("../db.js");


const addQuiNous = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ errorMessage: "No file uploaded" });
    }

    const { title, content} = req.body;
    const { token } = req.cookies;

    const imageURL = `${req.file.filename}`;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;

      const client = await dbConnect();

      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS quinous (
            id SERIAL PRIMARY KEY,
            title TEXT,
            content TEXT,
            cover TEXT
          
          );
        `);

        const query = `
          INSERT INTO quinous (title, content, cover)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;
        const values = [title, content, imageURL];
        const result = await client.query(query, values);
        const quinousDoc = result.rows[0];
        res.json(quinousDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error creating QuiNous" });
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const updateQuiNous = async (req, res) => {
  try {
    

    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, content} = req.body;

      const client = await dbConnect();
      try {
        const query = `
            SELECT * FROM quinous WHERE id = $1;
          `;
        const values = [id];
        const result = await client.query(query, values);
        const quinousDoc = result.rows[0];
        if (!quinousDoc) {
          return res.status(404).json("QuiNous not found");
        }
           const updateQuery = `
            UPDATE quinous 
            SET title = $1, content = $2,  cover = $3
            WHERE id = $4
            RETURNING *;
          `;
        const updateValues = [title, content, req.file ? `${req.file.filename}` : quinousDoc.cover, id];
        const updatedResult = await client.query(updateQuery, updateValues);
        const updatedQuiNousDoc = updatedResult.rows[0];

        res.json(updatedQuiNousDoc);
          
        
       
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error updating QuiNous" });
      } finally {
        client.release();
      }
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const getQuiNous = async (req, res) => {
  const client = await dbConnect();

  try {
    const query = `
        SELECT *
        FROM quinous 
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
    res.status(500).json({ errorMessage: "Error fetching QuiNous" });
  } finally {
    client.release();
  }
};
const getQuiNousByID = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;
      const client = await dbConnect();
      const quinousQuery = {
        text: 'SELECT * FROM quinous WHERE id = $1',
        values: [id],
      };
      const quinousResult = await client.query(quinousQuery);
      client.release();
      const quinousDoc = quinousResult.rows[0];
      res.json({
        quinousDoc
      });


    })

  } catch (error) {
    console.error('Error fetching QuiNous by ID:', error);
    res.status(500).json({ errorMessage: 'Error fetching QuiNous by ID' });
  }
};
const deleteQuiNous = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;

      const client = await dbConnect();
      try {
        const quinousQuery = `
            SELECT * FROM quinous WHERE id = $1;
          `;
        const quinousValues = [id];
        const quinousResult = await client.query(quinousQuery, quinousValues);
        const quinousDoc = quinousResult.rows[0];

        if (!quinousDoc) {
          return res.status(404).json("QuiNous not found");
        }
        const deleteQuery = `
            DELETE FROM quinous WHERE id = $1;
          `;
        const deleteValues = [id];
        await client.query(deleteQuery, deleteValues);

        res.json({ message: "QuiNous deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error deleting QuiNous" });
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
  addQuiNous,
  updateQuiNous,
  getQuiNous, getQuiNousByID,
  deleteQuiNous
};