import { RootState } from '../store';

export const cartItemSelectById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const cartSelect = (state: RootState) => state.cart;
