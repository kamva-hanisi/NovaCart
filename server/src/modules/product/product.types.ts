export interface CreateProductDto {
  category_id: number;
  brand_id: number;

  name: string;
  slug: string;

  sku: string;

  short_description?: string | undefined;

  description?: string | undefined;

  price: number;

  sale_price?: number | undefined;

  stock_quantity: number;

  thumbnail?: string | undefined;

  is_featured?: boolean | undefined;

  status?: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK" | "DRAFT" | undefined;
}

export interface ProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: number;
  brand?: number;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}
