const jwt = require("jsonwebtoken");
const { dbConnect } = require("../db.js");


const addEx = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ errorMessage: "No files uploaded" });
    }

    const { title, content } = req.body;
    const { token } = req.cookies;

    const imageURLs = req.files.map(file => file.filename);

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;

      const client = await dbConnect();

      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS exercices (
            id SERIAL PRIMARY KEY,
            title TEXT,
            content TEXT,
            files JSONB DEFAULT '[]'
          );
        `);
        const imageURLsJSON = JSON.stringify(imageURLs);

        const query = `
          INSERT INTO exercices (title, content, files)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;
        const values = [title, content, imageURLsJSON];
        const result = await client.query(query, values);
        const exDoc = result.rows[0];
        res.json(exDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error creating exercice" });
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const updateEx = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    const { id, title, content } = req.body;
    const files = req.files || []; 
    const newFileNames = files.map(file => file.filename);

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;

      const client = await dbConnect();
      try {
        const query = `
            SELECT * FROM exercices WHERE id = $1;
          `;
        const values = [id];
        const result = await client.query(query, values);
        const exDoc = result.rows[0];
        if (!exDoc) {
          return res.status(404).json("Exercice not found");
        }

        let imageURLs = exDoc.files || []; 
        imageURLs = imageURLs.concat(newFileNames); 
       

        const updateQuery = `
            UPDATE exercices 
            SET title = $1, content = $2, files = $3
            WHERE id = $4
            RETURNING *;
          `;
        const updateValues = [title, content, JSON.stringify(imageURLs), id];
        const updatedResult = await client.query(updateQuery, updateValues);
        const updatedExDoc = updatedResult.rows[0];
        res.json(updatedExDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error updating exercice" });
      } finally {
        client.release();
      }
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const getEx = async (req, res) => {
  const client = await dbConnect();

  try {
    const query = `
        SELECT *
        FROM exercices  ORDER BY id
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
    res.status(500).json({ errorMessage: "Error fetching exercices" });
  } finally {
    client.release();
  }
};
const getExByID = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;
      const client = await dbConnect();
      const exQuery = {
        text: 'SELECT * FROM exercices WHERE id = $1',
        values: [id],
      };
      const exResult = await client.query(exQuery);
      client.release();
      const exDoc = exResult.rows[0];
      res.json({
        exDoc
      });


    })

  } catch (error) {
    console.error('Error fetching exercice by ID:', error);
    res.status(500).json({ errorMessage: 'Error fetching exercice by ID' });
  }
};
const deleteEx = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;

      const client = await dbConnect();
      try {
        const exQuery = `
            SELECT * FROM exercices WHERE id = $1;
          `;
        const exValues = [id];
        const exResult = await client.query(exQuery, exValues);
        const exDoc = exResult.rows[0];

        if (!exDoc) {
          return res.status(404).json("exercice not found");
        }
        const deleteQuery = `
            DELETE FROM exercices WHERE id = $1;
          `;
        const deleteValues = [id];
        await client.query(deleteQuery, deleteValues);

        res.json({ message: "exercice deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error deleting exercice" });
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const deleteExFile = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;
      const { fileName } = req.body;

      const client = await dbConnect();
      try {
        const secQuery = `
            SELECT files FROM exercices WHERE id = $1;
          `;
        const secValues = [id];
        const secResult = await client.query(secQuery, secValues);
        const secDoc = secResult.rows[0];

        if (!secDoc) {
          return res.status(404).json("Section files not found");
        }
        const { files } = secDoc;
        const updatedFiles = files.filter(file => file !== fileName);

        const updateQuery = `
            UPDATE exercices 
            SET files = $1
            WHERE id = $2
            RETURNING *;
          `;
        const updateValues = [JSON.stringify(updatedFiles), id];
        const updatedResult = await client.query(updateQuery, updateValues);


        res.json({ message: "File deleted successfully", updatedSection: updatedResult.rows[0] });
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error deleting file" });
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
  addEx,
  updateEx,
  getEx, getExByID,
  deleteEx, deleteExFile
};