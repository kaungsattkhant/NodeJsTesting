/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username", 50).notNullable();
    table.string("phone_number", 50).notNullable();
    table.string("password", 120).notNullable();
    table.boolean("is_active").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    // .onUpdate(knex.fn.now());
    //   .onUpdate(knex.fn.now());
  });
};
// 09782378800
// Sai Thiha

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
};
