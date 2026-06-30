/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();

    table
      .integer("role_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("roles")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");

    table.string("first_name", 100).notNullable();

    table.string("last_name", 100).notNullable();

    table.string("email", 255).notNullable().unique();

    table.string("phone", 20).nullable();

    table.string("password_hash", 255).notNullable();

    table.string("avatar", 500).nullable();

    table.boolean("email_verified").defaultTo(false);

    table.enu("status", ["ACTIVE", "INACTIVE", "SUSPENDED"]).defaultTo("ACTIVE");

    table.timestamp("last_login").nullable();

    table.timestamps(true, true);

    table.index(["email"]);
    table.index(["role_id"]);
    table.index(["status"]);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("users");
}
