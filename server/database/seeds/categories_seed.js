/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("categories").del();

  await knex("categories").insert([
    {
      name: "Electronics",
      slug: "electronics",
      description: "Phones, laptops, TVs and accessories",
    },
    {
      name: "Fashion",
      slug: "fashion",
      description: "Clothing, shoes and accessories",
    },
    {
      name: "Home & Kitchen",
      slug: "home-kitchen",
      description: "Furniture and home essentials",
    },
    {
      name: "Beauty",
      slug: "beauty",
      description: "Beauty and personal care products",
    },
    {
      name: "Sports",
      slug: "sports",
      description: "Sports equipment and outdoor gear",
    },
    {
      name: "Books",
      slug: "books",
      description: "Books and educational materials",
    },
  ]);
}
