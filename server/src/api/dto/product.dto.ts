export type ProductNumberCompareDTO = {
  operator: string;
  value: number;
};

export type CreateProductDTO = {
  name: string;
  price: number;
  quantity: number;
};

export type UpdateProductDTO = {
  name?: string;
  price?: number;
  quantity?: number;
};

export type SearchProductDTO = {
  id?: ProductNumberCompareDTO;
  name?: string;
  price?: ProductNumberCompareDTO;
  quantity?: ProductNumberCompareDTO;
};

