/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("job_function", (table) => {
        table.increments("id").primary();
      
        // Foreign key to the jobs table
        table.integer("job_id").unsigned().notNullable();
        table.foreign("job_id").references("id").inTable("jobs").onDelete("CASCADE");
      
        // Foreign key to the functions table
        table.integer("function_id").unsigned().notNullable();
        table.foreign("function_id").references("id").inTable("functions").onDelete("CASCADE");
      
        // Timestamps
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
