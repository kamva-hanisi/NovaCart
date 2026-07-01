/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("brands").del();

  await knex("brands").insert([
    {
      name: "Apple",
      slug: "apple",
      description: "Apple products",
    },
    {
      name: "Samsung",
      slug: "samsung",
      description: "Samsung electronics",
    },
    {
      name: "Nike",
      slug: "nike",
      description: "Sportswear",
    },
    {
      name: "Adidas",
      slug: "adidas",
      description: "Sports apparel",
    },
    {
      name: "Sony",
      slug: "sony",
      description: "Electronics and gaming",
    },
  ]);
}
