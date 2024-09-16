/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("customers", function (table) {
        table.increments("id"); // Primary key
        table.string("name").notNullable();
        table.string("email").notNullable().unique();
        table.string("phone_number").notNullable();
        table.string("password").notNullable();
        table.timestamps(true, true); // created_at and updated_at timestamps
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('customers');
};
