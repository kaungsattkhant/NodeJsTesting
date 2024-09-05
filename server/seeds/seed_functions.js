/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("functions").del();

  // Inserts seed entries
  await knex("functions").insert([
    {
      name: "Accountant",
    
      is_active: true,
    },
    {
      name: "Management",
      is_active: true,
    },
    {
      name: "IT Hardware, Software",
      is_active: true,
    },
  ]);
};
