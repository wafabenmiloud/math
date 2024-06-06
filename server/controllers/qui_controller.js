const jwt = require("jsonwebtoken");
const { dbConnect } = require("../db.js");

//banner+bio
const addQui = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ errorMessage: "No file uploaded" });
    }
    const { title, content } = req.body;
    const { token } = req.cookies;
    const imageURL = `${req.file.filename}`;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const client = await dbConnect();
      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS qui (
            id SERIAL PRIMARY KEY,
            title TEXT,
            content TEXT,
            cover TEXT
          );
        `);

        const query = `
          INSERT INTO qui (title, content, cover)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;
        const values = [title, content, imageURL];
        const result = await client.query(query, values);
        const quiDoc = result.rows[0];
        res.json(quiDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error creating qui" });
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const updateQui = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, content } = req.body;

      const client = await dbConnect();
      try {
        const query = `
            SELECT * FROM qui WHERE id = $1;
          `;
        const values = [id];
        const result = await client.query(query, values);
        const quiDoc = result.rows[0];
        if (!quiDoc) {
          return res.status(404).json("qui not found");
        }
        const updateQuery = `
            UPDATE qui
            SET title = $1, content = $2, cover = $3
            WHERE id = $4
            RETURNING *;
          `;
        const updateValues = [title, content, req.file ? `${req.file.filename}` : quiDoc.cover, id];
        const updatedResult = await client.query(updateQuery, updateValues);
        const updatedquiDoc = updatedResult.rows[0];
        res.json(updatedquiDoc);

      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error updating qui" });
      } finally {
        client.release();
      }
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const getQui = async (req, res) => {
  const client = await dbConnect();

  try {
    const query = `
        SELECT *
        FROM qui ORDER BY id
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
    res.status(500).json({ errorMessage: "Error fetching qui" });
  } finally {
    client.release();
  }
};
const getQuiByID = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;
      const client = await dbConnect();
      const quiQuery = {
        text: 'SELECT * FROM qui WHERE id = $1',
        values: [id],
      };
      const quiResult = await client.query(quiQuery);
      client.release();
      const quiDoc = quiResult.rows[0];
      res.json({
        quiDoc
      });


    })

  } catch (error) {
    console.error('Error fetching qui by ID:', error);
    res.status(500).json({ errorMessage: 'Error fetching qui by ID' });
  }
};
const deleteQui = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;

      const client = await dbConnect();
      try {
        const quiQuery = `
            SELECT * FROM qui WHERE id = $1;
          `;
        const quiValues = [id];
        const quiResult = await client.query(quiQuery, quiValues);
        const quiDoc = quiResult.rows[0];

        if (!quiDoc) {
          return res.status(404).json("qui not found");
        }
        const deleteQuery = `
            DELETE FROM qui WHERE id = $1;
          `;
        const deleteValues = [id];
        await client.query(deleteQuery, deleteValues);

        res.json({ message: "qui deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error deleting qui" });
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};

//sections
const addQuiSec= async (req, res) => {
  try {

    const { title, content, letter, lien, button, title0, bio, title1, seccontent } = req.body;
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const client = await dbConnect();
      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS qui_section (
            id SERIAL PRIMARY KEY,
            title TEXT,
            content TEXT,
            lien TEXT,
            letter TEXT,
            button TEXT,
            title0 TEXT,
            bio TEXT,
            title1 TEXT,
            seccontent TEXT
          );
        `);

        const query = `
          INSERT INTO qui_section (title, content, letter, lien, button, title0, bio, title1, seccontent)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING *;
        `;
        const values = [title, content, letter,lien, button, title0, bio, title1, seccontent];
        const result = await client.query(query, values);
        const quiSecDoc = result.rows[0];
        res.json(quiSecDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error creating qui section" });
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const updateQuiSec = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, content, letter, lien, button, title0, bio, title1, seccontent } = req.body;

      const client = await dbConnect();
      try {
        const query = `
            SELECT * FROM qui_section WHERE id = $1;
          `;
        const values = [id];
        const result = await client.query(query, values);
        const quiSecDoc = result.rows[0];
        if (!quiSecDoc) {
          return res.status(404).json("qui section not found");
        }
        const updateQuery = `
            UPDATE qui_section
            SET title = $1, content = $2, letter = $3, lien = $4, button = $5, title0 = $6, bio = $7, title1 = $8, seccontent = $9 
            WHERE id = $10
            RETURNING *;
          `;
        const updateValues = [title, content, letter,lien,button,title0, bio, title1, seccontent, id];
        const updatedResult = await client.query(updateQuery, updateValues);
        const updatedquiSecDoc = updatedResult.rows[0];
        res.json(updatedquiSecDoc);

      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error updating qui section" });
      } finally {
        client.release();
      }
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const getQuiSec = async (req, res) => {
  const client = await dbConnect();

  try {
    const query = `
        SELECT *
        FROM qui_section ORDER BY id
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
    res.status(500).json({ errorMessage: "Error fetching qui sections" });
  } finally {
    client.release();
  }
};
const getQuiSecByID = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;
      const client = await dbConnect();
      const quiQuery = {
        text: 'SELECT * FROM qui_section WHERE id = $1',
        values: [id],
      };
      const quiResult = await client.query(quiQuery);
      client.release();
      const quiSecDoc = quiResult.rows[0];
      res.json({
        quiSecDoc
      });


    })

  } catch (error) {
    console.error('Error fetching qui by ID:', error);
    res.status(500).json({ errorMessage: 'Error fetching qui by ID' });
  }
};
const deleteQuiSec  = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;

      const client = await dbConnect();
      try {
        const quiQuery = `
            SELECT * FROM qui_section WHERE id = $1;
          `;
        const quiValues = [id];
        const quiResult = await client.query(quiQuery, quiValues);
        const quiDoc = quiResult.rows[0];

        if (!quiDoc) {
          return res.status(404).json("qui not found");
        }
        const deleteQuery = `
            DELETE FROM qui_section WHERE id = $1;
          `;
        const deleteValues = [id];
        await client.query(deleteQuery, deleteValues);

        res.json({ message: "qui deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error deleting qui" });
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
  addQui,
  updateQui,
  getQui, getQuiByID,
  deleteQui,addQuiSec,
  updateQuiSec,
  getQuiSec, getQuiSecByID,
  deleteQuiSec
};