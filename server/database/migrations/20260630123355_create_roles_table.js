/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("roles", (table) => {
    table.increments("id").primary();

    table.string("name", 50).notNullable().unique();

    table.string("description", 255);

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("roles");
}
