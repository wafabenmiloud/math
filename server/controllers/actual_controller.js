const jwt = require("jsonwebtoken");
const { dbConnect } = require("../db.js");


const addPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ errorMessage: "No file uploaded" });
    }

    const { title, summary, content, type, date } = req.body;
    const { token } = req.cookies;

    const imageURL = `${req.file.filename}`;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;

      const client = await dbConnect();

      try {
        // Check if "posts" table exists, if not create it
        await client.query(`
          CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            title TEXT,
            summary TEXT,
            content TEXT,
            cover TEXT,
            type TEXT,
            date DATE
          );
        `);

        // Insert new post
        const query = `
          INSERT INTO posts (title, summary, content, cover, type, date)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *;
        `;
        const values = [title, summary, content, imageURL, type, date];
        const result = await client.query(query, values);
        const postDoc = result.rows[0];
        res.json(postDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error creating post" });
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const updatePost = async (req, res) => {
  try {
    

    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, summary, content, type,date } = req.body;

      const client = await dbConnect();
      try {
        const query = `
            SELECT * FROM posts WHERE id = $1;
          `;
        const values = [id];
        const result = await client.query(query, values);
        const postDoc = result.rows[0];
        if (!postDoc) {
          return res.status(404).json("Post not found");
        }
           const updateQuery = `
            UPDATE posts 
            SET title = $1, summary = $2, content = $3, cover = $4, type=$5, date=$6
            WHERE id = $7
            RETURNING *;
          `;
        const updateValues = [title, summary, content, req.file ? `${req.file.filename}` : postDoc.cover, type,date, id];
        const updatedResult = await client.query(updateQuery, updateValues);
        const updatedPostDoc = updatedResult.rows[0];

        res.json(updatedPostDoc);
          
        
       
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error updating post" });
      } finally {
        client.release();
      }
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const getPost = async (req, res) => {
  const client = await dbConnect();

  try {
    const query = `
        SELECT *
        FROM posts 
        ORDER BY date DESC 
      `;
    const result = await client.query(query);

    // Check if the result contains rows
    if (result.rows.length === 0) {
      return res.json([]);
    }

    res.json(result.rows);
  } catch (error) {
    // Check if the error indicates that the table doesn't exist
    if (error.code === '42P01') {
      return res.json([]);
    }

    console.error(error);
    res.status(500).json({ errorMessage: "Error fetching posts" });
  } finally {
    client.release();
  }
};
const getPostByID = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;
      const client = await dbConnect();
      const postQuery = {
        text: 'SELECT * FROM posts WHERE id = $1',
        values: [id],
      };
      const postResult = await client.query(postQuery);
      client.release();
      const postDoc = postResult.rows[0];
      res.json({
        postDoc
      });


    })

  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ errorMessage: 'Error fetching post by ID' });
  }
};
const deletePost = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;

      const client = await dbConnect();
      try {
        const postQuery = `
            SELECT * FROM posts WHERE id = $1;
          `;
        const postValues = [id];
        const postResult = await client.query(postQuery, postValues);
        const postDoc = postResult.rows[0];

        if (!postDoc) {
          return res.status(404).json("Post not found");
        }
        const deleteQuery = `
            DELETE FROM posts WHERE id = $1;
          `;
        const deleteValues = [id];
        await client.query(deleteQuery, deleteValues);

        res.json({ message: "Post deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error deleting post" });
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
  addPost,
  updatePost,
  getPost, getPostByID,
  deletePost
};