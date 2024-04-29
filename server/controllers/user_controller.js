const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const speakeasy = require('speakeasy');
const { dbConnect } = require("../db.js");


async function signUp(req, res) {
  try {
    const { username, email, password } = req.body;

   /* const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must be at least 12 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character." });
    }*/

    const hashedPassword = await bcrypt.hash(password, 10);
    const secret = speakeasy.generateSecret().base32;

    const client = await dbConnect();
    const existingUser = await client.query(
      'SELECT * FROM admins WHERE email = $1;',
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    await client.query(
      'INSERT INTO admins (username, email, password, secret) VALUES ($1, $2, $3, $4);',
      [username, email, hashedPassword, secret]
    );

    client.release();
    res.status(201).json({ message: "User created successfully, Please Sign in to your account!" });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Error signing up user" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const client = await dbConnect();

    const user = await client.query('SELECT * FROM admins WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(404).json({message:'User not found.'});
    }

    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) {
      return res.status(401).json({message:'Invalid password.'});
    }

    // Send the secret key to the client
    res.json({ secret: user.rows[0].secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'An error occurred.'});
  }
}

async function verifyCode(req, res) {
  try {
    const { email, code } = req.body;
    const client = await dbConnect();

    const user = await client.query('SELECT * FROM admins WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Verify the code against the secret key stored in the database
    const isValidCode = speakeasy.totp.verify({
      secret: user.rows[0].secret,
      encoding: 'base32',
      token: code,
    });


    if (isValidCode) {
      const token = jwt.sign({id: user.rows[0].id, username: user.rows[0].username }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.cookie('token', token,
        {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          expiresIn: 3600000,
        });

        return res.status(200).json({ message: 'Code is valid. Logged In successfully', token });
      } else {
      return res.status(401).json({ error: 'Invalid code.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
}
const logout = (req, res) => {
  res
    .cookie('token', '', {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .send();
};
const authenticateToken = (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json({ logged: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
      if (err) {
        console.error("Error verifying token:", err);
        return res.json({ error: "Token verification failed" });
      }

      const user = {
        logged: true,
        data: userInfo
      };
      res.json(user);
    });
  } catch (err) {
    console.error("Error in authentication:", err);
    res.json({ error: "Authentication error" });
  }
};


module.exports = {
  login, signUp, verifyCode, logout,
  authenticateToken
};
