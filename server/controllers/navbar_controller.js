const jwt = require("jsonwebtoken");
const { dbConnect } = require("../db.js");


const addItem = async (req, res) => {
  try {

    const { title, f_url, b_url } = req.body;
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const client = await dbConnect();
      try {
        await client.query(`
          CREATE TABLE navbar_items (
          id SERIAL PRIMARY KEY,
          title TEXT,
          f_url TEXT,
          b_url TEXT
            );
        `);

        const query = `
          INSERT INTO navbar_items (title, f_url, b_url)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;
        const values = [title, f_url, b_url];
        const result = await client.query(query, values);
        const ItemDoc = result.rows[0];
        res.json(ItemDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error creating Item" });
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const updateItem = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, f_url, b_url } = req.body;
      const client = await dbConnect();
      try {
        const query = `
            SELECT * FROM navbar_items WHERE id = $1;
          `;
        const values = [id];
        const result = await client.query(query, values);
        const ItemDoc = result.rows[0];
        if (!ItemDoc) {
          return res.status(404).json("Item not found");
        }
        const updateQuery = `
            UPDATE navbar_items 
            SET title = $1, f_url = $2, b_url = $3
            WHERE id = $4
            RETURNING *;
          `;
        const updateValues = [title, f_url,b_url, id];
        const updatedResult = await client.query(updateQuery, updateValues);
        const updatedItemDoc = updatedResult.rows[0];
        res.json(updatedItemDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error updating Item" });
      } finally {
        client.release();
      }
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const getItem = async (req, res) => {
  const client = await dbConnect();

  try {
    const query = `
        SELECT *
        FROM navbar_items
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
    res.status(500).json({ errorMessage: "Error fetching Items" });
  } finally {
    client.release();
  }
};
const getItemByID = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;
      const client = await dbConnect();
      const ItemQuery = {
        text: 'SELECT * FROM navbar_items WHERE id = $1',
        values: [id],
      };
      const ItemResult = await client.query(ItemQuery);
      client.release();
      const itemDoc = ItemResult.rows[0];
      res.json({
        itemDoc
      });


    })

  } catch (error) {
    console.error('Error fetching Item by ID:', error);
    res.status(500).json({ errorMessage: 'Error fetching Item by ID' });
  }
};


module.exports = {
  addItem,
  updateItem,
  getItem, getItemByID
};