/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("categories", (table) => {
    table.increments("id").primary();

    table.string("name", 100).notNullable().unique();

    table.string("slug", 120).notNullable().unique();

    table.text("description").nullable();

    table.string("image", 500).nullable();

    table.boolean("is_active").defaultTo(true);

    table.timestamps(true, true);

    table.index(["name"]);
    table.index(["slug"]);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("categories");
}
