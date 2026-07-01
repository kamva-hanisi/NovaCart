/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("cart_items", (table) => {
    table.increments("id").primary();

    table
      .integer("cart_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("carts")
      .onDelete("CASCADE");

    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");

    table.integer("quantity").notNullable().defaultTo(1);

    table.decimal("unit_price", 10, 2).notNullable();

    table.timestamps(true, true);

    table.unique(["cart_id", "product_id"]);

    table.index(["cart_id"]);

    table.index(["product_id"]);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("cart_items");
}
