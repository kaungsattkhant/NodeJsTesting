const knex = require("knex")(require("../knexfile").development);

const bcrypt = require("bcrypt");
//
const getUsers = async (req, res) => {
  try {
    const rows=await knex('users').orderBy('id','desc');
    res.json({ data: rows });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving user", error: err.message });
  }
};

const getDetail = async (req, res) => {
  const userId = req.params.id;
  //mysql
  //   const [rows] = await db.query("SELECT * FROM users WHERE id = ?", userId);
  //   if (rows.length === 0) {
  //     return res.status(404).json({ message: "User not found" });
  //   }
  //   res.status(200).json({
  //     message: "User retrieved successfully",
  //     status: 200,
  //     data: rows[0],
  //   });

  //knex
  const user = await knex("users").where({ id: userId }).first();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    message: "User retrieved successfully",
    status: 200,
    data: user,
  });
};

const storeUser = async (req, res) => {
  const { id, username, phone_number, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert the new user
    // const query =
    //     "UPDATE users(username, phone_number, password) WHERE(?, ?, ?)";
    if (id) {
      //   const query =
      //     "UPDATE users(username, phone_number, password) WHERE(?, ?, ?)";
      const updates = {};
      if (username) updates.username = username;
      if (phone_number) updates.phone_number = phone_number;
      if (hashedPassword) updates.password = hashedPassword;

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No fields to update" });
      }
      // Perform the update
      const result = await knex("users").where({ id }).update(updates);

      // Check if the update was successful
      if (result === 0) {
        return res
          .status(404)
          .json({ message: "User not found or no changes made" });
      }
      res.status(200).json({
        message: "User update Successfully",
        status: 200,
        data: result,
      });
    } else {
      console.log(hashedPassword);
      const result = await knex("users").insert({
        username,
        phone_number,
        password: hashedPassword,
      });
      console.log(result);
      const insertId = result[0];
      if (!insertId) {
        return res.status(500).json({ message: "User creation failed" });
      }
      // Retrieve the newly created user
      const newUser = await knex("users").where({ id: insertId }).first();
      console.log(newUser);
      res.status(200).json({
        message: "User Create Successfully",
        status: 200,
        data: newUser,
      });
    }
  } catch (error) {}
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    // Delete the user from the 'accounts' table
    const result = await knex("users").where("id", userId).del();

    if (result === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      status: 200,
      id: userId,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      message: "An error occurred",
      status: 500,
      error: error.message,
    });
  }
};

module.exports = { getUsers, storeUser, getDetail, deleteUser };
