const jwt = require("jsonwebtoken");
const { dbConnect } = require("../db.js");

//slides
const addSlides = async (req, res) => {
  try {

    const { slides,button } = req.body;
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const client = await dbConnect();
      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS home_slides (
            id SERIAL PRIMARY KEY,
            slides TEXT[],
            button TEXT
          );
        `);

        const query = `
          INSERT INTO home_slides (slides,link)
          VALUES ($1,$2)
          RETURNING *;
        `;
        const values = [slides,button];
        const result = await client.query(query, values);
        const slidesDoc = result.rows[0];
        res.json(slidesDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error creating slides" });
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const updateSlides = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id, slides,button } = req.body;
      const client = await dbConnect();
      try {
        const query = `
            SELECT * FROM home_slides WHERE id = $1;
          `;
        const values = [id];
        const result = await client.query(query, values);
        const slidesDoc = result.rows[0];
        if (!slidesDoc) {
          return res.status(404).json("slides not found");
        }
        const updateQuery = `
            UPDATE home_slides 
            SET slides = $1, button = $2
            WHERE id = $3
            RETURNING *;
          `;
        const updateValues = [slides,button, id];
        const updatedResult = await client.query(updateQuery, updateValues);
        const updatedDoc = updatedResult.rows[0];
        res.json(updatedDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error updating slides" });
      } finally {
        client.release();
      }
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const getSlides = async (req, res) => {
  const client = await dbConnect();

  try {
    const query = `
        SELECT *
        FROM home_slides
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
    res.status(500).json({ errorMessage: "Error fetching slides" });
  } finally {
    client.release();
  }
};
const getSlidesByID = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;
      const client = await dbConnect();
      const slidesQuery = {
        text: 'SELECT * FROM home_slides WHERE id = $1',
        values: [id],
      };
      const slidesResult = await client.query(slidesQuery);
      client.release();
      const slidesDoc = slidesResult.rows[0];
      res.json({
        slidesDoc
      });
    })
  } catch (error) {
    console.error('Error fetching slide by ID:', error);
    res.status(500).json({ errorMessage: 'Error fetching slide by ID' });
  }
};

//bio
const addBio = async (req, res) => {
  try {

    const { bio } = req.body;
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const client = await dbConnect();
      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS home_bio (
            id SERIAL PRIMARY KEY,
            bio TEXT
          );
        `);

        const query = `
          INSERT INTO home_bio (bio)
          VALUES ($1)
          RETURNING *;
        `;
        const values = [bio];
        const result = await client.query(query, values);
        const bioDoc = result.rows[0];
        res.json(bioDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error creating bio" });
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const updateBio = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id, bio } = req.body;
      const client = await dbConnect();
      try {
        const query = `
            SELECT * FROM home_bio WHERE id = $1;
          `;
        const values = [id];
        const result = await client.query(query, values);
        const bioDoc = result.rows[0];
        if (!bioDoc) {
          return res.status(404).json("bio not found");
        }
        const updateQuery = `
            UPDATE home_bio 
            SET bio = $1
            WHERE id = $2
            RETURNING *;
          `;
        const updateValues = [bio, id];
        const updatedResult = await client.query(updateQuery, updateValues);
        const updatedDoc = updatedResult.rows[0];
        res.json(updatedDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error updating bio" });
      } finally {
        client.release();
      }
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const getBio = async (req, res) => {
  const client = await dbConnect();

  try {
    const query = `
        SELECT *
        FROM home_bio
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
    res.status(500).json({ errorMessage: "Error fetching bio" });
  } finally {
    client.release();
  }
};
const getBioByID = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;
      const client = await dbConnect();
      const bioQuery = {
        text: 'SELECT * FROM home_bio WHERE id = $1',
        values: [id],
      };
      const bioResult = await client.query(bioQuery);
      client.release();
      const bioDoc = bioResult.rows[0];
      res.json({
        bioDoc
      });
    })
  } catch (error) {
    console.error('Error fetching slide by ID:', error);
    res.status(500).json({ errorMessage: 'Error fetching slide by ID' });
  }
};

//section
const addSection = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ errorMessage: "No files uploaded" });
    }

    const { content } = req.body;
    const { token } = req.cookies;

    const imageURLs = req.files.map(file => file.filename);

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;

      const client = await dbConnect();

      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS home_sections (
            id SERIAL PRIMARY KEY,
            content TEXT,
            files JSONB DEFAULT '[]'
          );
        `);
        const imageURLsJSON = JSON.stringify(imageURLs);

        const query = `
          INSERT INTO home_sections (content, files)
          VALUES ($1, $2)
          RETURNING *;
        `;
        const values = [content, imageURLsJSON];
        const result = await client.query(query, values);
        const secDoc = result.rows[0];
        res.json(secDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error creating section" });
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const updateSection = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id, content } = req.body;
      const files = req.files;

      const client = await dbConnect();
      try {
        const query = `
            SELECT * FROM home_sections WHERE id = $1;
          `;
        const values = [id];
        const result = await client.query(query, values);
        const secDoc = result.rows[0];
        if (!secDoc) {
          return res.status(404).json("section not found");
        }

        let imageURLs = secDoc.files;
        let newFiles = [];

        if (files && files.length > 0) {
          newFiles = files.map(file => file.filename);
        }

        const updateQuery = `
            UPDATE home_sections 
            SET content = $1, files = $2
            WHERE id = $3
            RETURNING *;
          `;
        const updateValues = [content, newFiles.length > 0 ? JSON.stringify(newFiles) : JSON.stringify(imageURLs), id];
        const updatedResult = await client.query(updateQuery, updateValues);
        const updatedSecDoc = updatedResult.rows[0];
        res.json(updatedSecDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error updating section" });
      } finally {
        client.release();
      }
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const getSection = async (req, res) => {
  const client = await dbConnect();

  try {
    const query = `
        SELECT *
        FROM home_sections 
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
    res.status(500).json({ errorMessage: "Error fetching sections" });
  } finally {
    client.release();
  }
};
const getSectionByID = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;
      const client = await dbConnect();
      const secQuery = {
        text: 'SELECT * FROM home_sections WHERE id = $1',
        values: [id],
      };
      const secResult = await client.query(secQuery);
      client.release();
      const secDoc = secResult.rows[0];
      res.json({
        secDoc
      });


    })

  } catch (error) {
    console.error('Error fetching exercice by ID:', error);
    res.status(500).json({ errorMessage: 'Error fetching exercice by ID' });
  }
};
const deleteSection = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;

      const client = await dbConnect();
      try {
        const secQuery = `
            SELECT * FROM home_sections WHERE id = $1;
          `;
        const secValues = [id];
        const secResult = await client.query(secQuery, secValues);
        const secDoc = secResult.rows[0];

        if (!secDoc) {
          return res.status(404).json("section not found");
        }
        const deleteQuery = `
            DELETE FROM home_sections WHERE id = $1;
          `;
        const deleteValues = [id];
        await client.query(deleteQuery, deleteValues);

        res.json({ message: "section deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error deleting section" });
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};

//ssection
const addSSection = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ errorMessage: "No file uploaded" });
    }

    const { title, link, button } = req.body;
    const { token } = req.cookies;

    const imageURL = `${req.file.filename}`;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;

      const client = await dbConnect();

      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS ssections (
            id SERIAL PRIMARY KEY,
            title TEXT,
            link TEXT,
            cover TEXT,
            button Text
          
          );
        `);

        const query = `
          INSERT INTO ssections (title, link, cover, button)
          VALUES ($1, $2, $3, $4)
          RETURNING *;
        `;
        const values = [title, link, imageURL, button];
        const result = await client.query(query, values);
        const ssectionDoc = result.rows[0];
        res.json(ssectionDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error creating ssection" });
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const updateSSection = async (req, res) => {
  try {


    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, link ,button} = req.body;

      const client = await dbConnect();
      try {
        const query = `
            SELECT * FROM ssections WHERE id = $1;
          `;
        const values = [id];
        const result = await client.query(query, values);
        const ssectionDoc = result.rows[0];
        if (!ssectionDoc) {
          return res.status(404).json("ssection not found");
        }
        const updateQuery = `
            UPDATE ssections 
            SET title = $1, link = $2,  cover = $3, button=$4
            WHERE id = $5
            RETURNING *;
          `;
        const updateValues = [title, link, req.file ? `${req.file.filename}` : ssectionDoc.cover, button,id];
        const updatedResult = await client.query(updateQuery, updateValues);
        const updatedssectionDoc = updatedResult.rows[0];

        res.json(updatedssectionDoc);



      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error updating ssection" });
      } finally {
        client.release();
      }
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const getSSection = async (req, res) => {
  const client = await dbConnect();

  try {
    const query = `
        SELECT *
        FROM ssections 
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
    res.status(500).json({ errorMessage: "Error fetching ssection" });
  } finally {
    client.release();
  }
};
const getSSectionByID = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;
      const client = await dbConnect();
      const ssectionQuery = {
        text: 'SELECT * FROM ssections WHERE id = $1',
        values: [id],
      };
      const ssectionResult = await client.query(ssectionQuery);
      client.release();
      const ssecDoc = ssectionResult.rows[0];
      res.json({
        ssecDoc
      });


    })

  } catch (error) {
    console.error('Error fetching ssection by ID:', error);
    res.status(500).json({ errorMessage: 'Error fetching ssection by ID' });
  }
};
const deleteSSection = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;

      const client = await dbConnect();
      try {
        const ssectionQuery = `
            SELECT * FROM ssections WHERE id = $1;
          `;
        const ssectionValues = [id];
        const ssectionResult = await client.query(ssectionQuery, ssectionValues);
        const ssectionDoc = ssectionResult.rows[0];

        if (!ssectionDoc) {
          return res.status(404).json("ssection not found");
        }
        const deleteQuery = `
            DELETE FROM ssections WHERE id = $1;
          `;
        const deleteValues = [id];
        await client.query(deleteQuery, deleteValues);

        res.json({ message: "ssection deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error deleting ssection" });
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
  addSlides,
  updateSlides,
  getSlides,
  getSlidesByID,
  addSection,
  updateSection,
  getSection,
  getSectionByID,
  deleteSection,
  addBio,
  updateBio,
  getBio,
  getBioByID,
  addSSection,
  updateSSection,
  getSSection,
  getSSectionByID,
  deleteSSection
};