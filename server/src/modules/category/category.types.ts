export interface CreateCategoryDto {
  name: string;
  slug: string;
  description?: string | undefined;
  image?: string | undefined;
}

export interface UpdateCategoryDto {
  name?: string | undefined;
  slug?: string | undefined;
  description?: string | undefined;
  image?: string | undefined;
  is_active?: boolean | undefined;
}
