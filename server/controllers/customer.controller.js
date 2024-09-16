const knex = require("knex")(require("../knexfile").development);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, phone_number, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await knex("customers").insert({
    name,
    email,
    phone_number,
    password: hashedPassword,
  });
  const insertId = result[0];
  // console.log(insertId);
  if (!insertId) {
    return res.status(500).json({ message: "Create error" });
  }
  const createdCustomer = await knex("customers")
    .where({ id: insertId })
    .first();

  if (!createdCustomer) {
    return res.status(404).json({ message: "Data Not Found" });
  }
  const token = jwt.sign(
    { id: createdCustomer.id, name: createdCustomer.name },
    "here-job", // replace with your secret key
    { expiresIn: "1h" } // optional: token expiration
  );
  return res.status(200).json({
    message: "Register successful",
    token: token,
    customer: {
      id: createdCustomer.id,
      name: createdCustomer.name,
    },
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    const customer = await knex("customers").where({ email: email }).first();
    if (!customer) {
      return res.status(404).json({ message: "Data not found." });
    }
    const foundUser = customer;
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      console.log("Is Match ", isMatch);
      return res.status(401).json({ message: "Invalid credentials." });
    }
    // res.status(200).json({user_id:foundUser.id});
    const token = jwt.sign(
      { id: foundUser.id, name: foundUser.name },
      "here-job", // replace with your secret key
      { expiresIn: "1h" } // optional: token expiration
    );
    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: foundUser.id,
        name: foundUser.name,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error logging in user", error: err.message });
  }
};

module.exports = { register, login };
