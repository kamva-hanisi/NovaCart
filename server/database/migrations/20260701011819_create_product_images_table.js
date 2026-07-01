/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("product_images", (table) => {
    table.increments("id").primary();

    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("products")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table.string("image_url", 500).notNullable();

    table.string("alt_text", 255).nullable();

    table.integer("sort_order").defaultTo(1);

    table.boolean("is_primary").defaultTo(false);

    table.timestamps(true, true);

    table.index(["product_id"]);
    table.index(["sort_order"]);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("product_images");
}
