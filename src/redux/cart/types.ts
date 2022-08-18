export type CartItem = {
  id: string;
  name: string;
  price: number;
  count: number;
  imageUrl: string;
  type: string;
  size: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
