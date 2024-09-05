/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("jobs", (table) => {
    table.increments("id").primary();
    table.string("name", 50).notNullable();
    table.string("company", 255).notNullable();
    table.datetime("date_time").notNullable();
    table.longtext("education").notNullable();
    table.longtext("description").notNullable();
    table.integer("location_id").unsigned();
    table.integer("user_id").unsigned();
    table.boolean("is_active").defaultTo(false);
    // table.integer("location_id").unsigned().references("id").inTable("locations").onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    // table.timestamp("updated_at").defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    // table
    //   .timestamp("updated_at")
    //   .defaultTo(knex.fn.now())
    //   .onUpdate(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
