const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const routes = require('./routes');
const { dbConnect } = require('./db');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ['https://www.master-7rqtwti-luxgbhg4vwqu6.ovhcloud-fr-1.webpaas.ovh.net'] }));

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use('/uploads', express.static(path.join(__dirname, '../web/uploads')));

// Routes
app.use('/api', routes);

// Fallback route for React app
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start server
const port = process.env.PORT || 8888;
app.listen(port, async () => {
  console.log(`Server is up and running on port ${port}`);
  try {
    await dbConnect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
});
