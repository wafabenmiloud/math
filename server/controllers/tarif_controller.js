const jwt = require("jsonwebtoken");
const { dbConnect } = require("../db.js");


const addTarif = async (req, res) => {
  try {
  
    const { title, content} = req.body;
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const client = await dbConnect();
      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS tarifs (
            id SERIAL PRIMARY KEY,
            title TEXT,
            content TEXT
          
          );
        `);

        const query = `
          INSERT INTO tarifs (title, content)
          VALUES ($1, $2)
          RETURNING *;
        `;
        const values = [title, content];
        const result = await client.query(query, values);
        const tarifDoc = result.rows[0];
        res.json(tarifDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error creating tarif" });
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const updateTarif = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, content} = req.body;
      const client = await dbConnect();
      try {
        const query = `
            SELECT * FROM tarifs WHERE id = $1;
          `;
        const values = [id];
        const result = await client.query(query, values);
        const tarifDoc = result.rows[0];
        if (!tarifDoc) {
          return res.status(404).json("tarif not found");
        }
           const updateQuery = `
            UPDATE tarifs 
            SET title = $1, content = $2
            WHERE id = $3
            RETURNING *;
          `;
        const updateValues = [title, content, id];
        const updatedResult = await client.query(updateQuery, updateValues);
        const updatedtarifDoc = updatedResult.rows[0];
        res.json(updatedtarifDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error updating tarif" });
      } finally {
        client.release();
      }
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const getTarif = async (req, res) => {
  const client = await dbConnect();

  try {
    const query = `
        SELECT *
        FROM tarifs
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
    res.status(500).json({ errorMessage: "Error fetching tarifs" });
  } finally {
    client.release();
  }
};
const getTarifByID = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;
      const client = await dbConnect();
      const tarifQuery = {
        text: 'SELECT * FROM tarifs WHERE id = $1',
        values: [id],
      };
      const tarifResult = await client.query(tarifQuery);
      client.release();
      const tarifDoc = tarifResult.rows[0];
      res.json({
        tarifDoc
      });


    })

  } catch (error) {
    console.error('Error fetching tarif by ID:', error);
    res.status(500).json({ errorMessage: 'Error fetching tarif by ID' });
  }
};
const deleteTarif = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;

      const client = await dbConnect();
      try {
        const tarifQuery = `
            SELECT * FROM tarifs WHERE id = $1;
          `;
        const tarifValues = [id];
        const tarifResult = await client.query(tarifQuery, tarifValues);
        const tarifDoc = tarifResult.rows[0];

        if (!tarifDoc) {
          return res.status(404).json("tarif not found");
        }
        const deleteQuery = `
            DELETE FROM tarifs WHERE id = $1;
          `;
        const deleteValues = [id];
        await client.query(deleteQuery, deleteValues);

        res.json({ message: "tarif deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error deleting tarif" });
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
  addTarif,
  updateTarif,
  getTarif, getTarifByID,
  deleteTarif
};