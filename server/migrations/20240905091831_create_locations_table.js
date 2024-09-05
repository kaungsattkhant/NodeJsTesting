/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("locations", (table) => {
    table.increments("id").primary();
    table.string("name", 50).notNullable();
    table.decimal("latitude", 9, 6).notNullable();
    table.decimal("longitude", 9, 6).notNullable();
    table.boolean("is_active").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    // table.timestamp("updated_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.fn.now());
    //   .onUpdate(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
