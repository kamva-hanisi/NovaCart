/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("addresses", (table) => {
    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("full_name", 150).notNullable();

    table.string("phone", 20).notNullable();

    table.string("address_line_1", 255).notNullable();

    table.string("address_line_2", 255);

    table.string("city", 100).notNullable();

    table.string("province", 100).notNullable();

    table.string("postal_code", 20).notNullable();

    table.string("country", 100).defaultTo("South Africa");

    table.boolean("is_default").defaultTo(false);

    table.timestamps(true, true);

    table.index(["user_id"]);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("addresses");
}
