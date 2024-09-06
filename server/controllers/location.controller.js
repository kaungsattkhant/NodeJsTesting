const knex = require("knex")(require("../knexfile").development);

const getLocations = async (req, res) => {
  try {
    const rows = await knex("locations").orderBy("id", "desc");
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving ", error: err.message });
  }
};

module.exports = { getLocations };
