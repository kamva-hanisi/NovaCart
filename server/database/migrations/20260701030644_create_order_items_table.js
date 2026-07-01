/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("order_items", (table) => {
    table.increments("id").primary();

    table
      .integer("order_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");

    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("products")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");

    table.integer("quantity").notNullable();

    table.decimal("unit_price", 10, 2).notNullable();

    table.decimal("subtotal", 10, 2).notNullable();

    table.timestamps(true, true);

    table.index(["order_id"]);
    table.index(["product_id"]);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("order_items");
}
