/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("brands", (table) => {
    table.increments("id").primary();

    table.string("name", 100).notNullable().unique();

    table.string("slug", 120).notNullable().unique();

    table.text("description").nullable();

    table.string("logo", 500).nullable();

    table.string("website", 255).nullable();

    table.boolean("is_active").defaultTo(true);

    table.timestamps(true, true);

    table.index(["name"]);
    table.index(["slug"]);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("brands");
}
