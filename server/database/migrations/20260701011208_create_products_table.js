/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("products", (table) => {
    table.increments("id").primary();

    table
      .integer("category_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("categories")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");

    table
      .integer("brand_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("brands")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");

    table.string("name", 255).notNullable();

    table.string("slug", 255).notNullable().unique();

    table.string("sku", 100).notNullable().unique();

    table.string("short_description", 500);

    table.text("description");

    table.decimal("price", 10, 2).notNullable();

    table.decimal("sale_price", 10, 2).nullable();

    table.integer("stock_quantity").defaultTo(0);

    table.string("thumbnail", 500).nullable();

    table.boolean("is_featured").defaultTo(false);

    table.enu("status", ["ACTIVE", "INACTIVE", "OUT_OF_STOCK", "DRAFT"]).defaultTo("DRAFT");

    table.timestamps(true, true);

    table.index(["category_id"]);
    table.index(["brand_id"]);
    table.index(["slug"]);
    table.index(["sku"]);
    table.index(["status"]);
    table.index(["is_featured"]);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("products");
}
