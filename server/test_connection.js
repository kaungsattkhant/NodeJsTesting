const knex = require("knex")(require("./knexfile").development);

const testConnection = async () => {
  try {
    // Run a simple query to test the connection
    await knex.raw('SELECT 1+1 AS result');
    console.log('Database connection is successful!');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  } finally {
    // Destroy the connection pool
    await knex.destroy();
  }
};

testConnection();
