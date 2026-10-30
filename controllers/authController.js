const db = require("../config/db");
const bcrypt = require("bcrypt");


const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
  return res.status(400).json({
    message: "All fields are required"
  });
}


if (!email.includes("@")) {
  return res.status(400).json({
    message: "Invalid email format"
  });
}

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *",
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: "User Registered Successfully",
      user: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};








exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
  return res.status(400).json({
    message: "Email and Password are required"
  });
}


if (!email.includes("@")) {
  return res.status(400).json({
    message: "Invalid email format"
  });
}

    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User Not Found"
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};





exports.getProfile = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [req.user.id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};