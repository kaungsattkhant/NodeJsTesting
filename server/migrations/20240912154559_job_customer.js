/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("job_customer", (table) => {
    table.increments("id").primary(); // Auto-incrementing ID
    table.integer("job_id").unsigned().notNullable();
    table
      .foreign("job_id")
      .references("id")
      .inTable("jobs")
      .onDelete("CASCADE");
    table.integer("customer_id").unsigned().notNullable();
    table
      .foreign("customer_id")
      .references("id")
      .inTable("customers")
      .onDelete("CASCADE");
    table.timestamps(true, true); // created_at and updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("job_customer");
};
