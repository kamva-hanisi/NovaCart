/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .integer("address_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("addresses")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");

    table.decimal("subtotal", 10, 2).notNullable();

    table.decimal("shipping_fee", 10, 2).defaultTo(0);

    table.decimal("total", 10, 2).notNullable();

    table
      .enum("status", ["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"])
      .defaultTo("PENDING");

    table.timestamps(true, true);

    table.index(["user_id"]);
    table.index(["status"]);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("orders");
}
