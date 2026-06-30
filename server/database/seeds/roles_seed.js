/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("roles").del();

  await knex("roles").insert([
    {
      name: "Admin",
      description: "System Administrator",
    },
    {
      name: "Customer",
      description: "Registered Customer",
    },
  ]);
}
