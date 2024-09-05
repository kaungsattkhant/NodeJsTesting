const knex = require("knex")(require("../knexfile").development);

const getFunctions = async (req, res) => {
  try {
    const rows = await knex("functions").orderBy("id", "desc");
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving ", error: err.message });
  }
};

module.exports = { getFunctions };
