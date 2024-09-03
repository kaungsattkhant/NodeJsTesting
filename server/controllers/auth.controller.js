const db = require("../db/connect");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken');
const loginAuth = async (req, res) => {
  try {
    const { username, password } = req.body;
   
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Phone number and password are required." });
    }
    const userQuery = "SELECT * FROM users WHERE username = ?";
    const [user] = await db.execute(userQuery, [username]);
    if (!user.length) {
      return res.status(404).json({ message: "User not found." });
    }
    const foundUser = user[0];
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
        console.log('Is Match ' , isMatch);
      return res.status(401).json({ message: "Invalid credentials." });
    }
    // res.status(200).json({user_id:foundUser.id});
    const token = jwt.sign(
        { id: foundUser.id, username: foundUser.username },
        'your-secret-key', // replace with your secret key
        { expiresIn: '1h' } // optional: token expiration
      );
    res.status(200).json({
      message: "Login successful",
      token:token,
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
