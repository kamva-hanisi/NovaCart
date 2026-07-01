export interface CreateBrandDto {
  name: string;
  slug: string;
  description?: string | undefined;
  logo?: string | undefined;
  website?: string | undefined;
}

export interface UpdateBrandDto {
  name?: string | undefined;
  slug?: string | undefined;
  description?: string | undefined;
  logo?: string | undefined;
  website?: string | undefined;
  is_active?: boolean | undefined;
}
