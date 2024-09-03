const db = require("../db/connect");
const getAccounts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM accounts ORDER BY id DESC");
    // console.log(rows);
    res.json(rows);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving accounts", error: err.message });
  }
};
const storeAccount = async (req, res) => {
  const {
    name,
    phone_number,
    color_code,
    account_type,
    deposit_id,
    withdrawal_id,
    is_active,
  } = req.body;
  try {
    const query =
      "INSERT INTO accounts (name, phone_number, color_code, account_type, deposit_id, withdrawal_id,is_active) VALUES (?, ?, ?, ?, ?, ?,?)";
    const [result] = await db.query(query, [
      name,
      phone_number,
      color_code,
      account_type,
      deposit_id,
      withdrawal_id,
      is_active,
    ]);
    // console.log(result);
    // res.json(result);
    // Fetch the newly created account from the database
    const [newAccount] = await db.query("SELECT * FROM accounts WHERE id = ?", [
      result.insertId,
    ]);
    res.json(newAccount[0]);
  } catch (err) {
    res.status(500).json({
      message: "Error creating account",
      error: err.message,
    });
  }
  // db.query(
  //   "INSERT INTO accounts (name ,phone_number,color_code,account_type,deposit_id,withdrawal_id) VALUES (?,?,?,?,?,?)",
  //   [name, phone_number, color_code, account_type, deposit_id, withdrawal_id],
  //   (err, result) => {
  //     if (err) throw err;
  //     res.json({
  //       message: "Account created successfully",
  //       id: result.id,
  //     });
  //   }
  // );
};

module.exports = { getAccounts, storeAccount };
