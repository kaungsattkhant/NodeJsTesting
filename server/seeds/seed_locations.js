/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("locations").del();

  // Inserts seed entries
  await knex("locations").insert([
    {
      name: "Location A",
      latitude: 40.712776,
      longitude: -74.005974,
      is_active: true,
    },
    {
      name: "Location B",
      latitude: 34.052235,
      longitude: -118.243683,
      is_active: true,
    },
    {
      name: "Location C",
      latitude: 51.507351,
      longitude: -0.127758,
      is_active: false,
    },
  ]);
};
