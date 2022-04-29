export interface Product extends Record<string, any> {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
