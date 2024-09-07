const db = require("../db/connect");
const knex = require("knex")(require("../knexfile").development);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginAuth = async (req, res) => {
  try {
    const { phone_number, password } = req.body;
    console.log(req.body);
    if (!phone_number || !password) {
      return res
        .status(400)
        .json({ message: "Phone number and password are required." });
    }
    const user = await knex("users")
      .where({ phone_number: phone_number })
      .first();
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const foundUser = user;
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      console.log("Is Match ", isMatch);
      return res.status(401).json({ message: "Invalid credentials." });
    }
    // res.status(200).json({user_id:foundUser.id});
    const token = jwt.sign(
      { id: foundUser.id, username: foundUser.username },
     'here-job', // replace with your secret key
      // { expiresIn: "1h" } // optional: token expiration
    );
    console.log(token);
    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error logging in user", error: err.message });
  }
};

module.exports = { loginAuth };
