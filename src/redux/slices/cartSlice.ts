import { getCartFromLS } from './../../utils/getCartFromLS';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Pizza } from './pizzaSlice';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

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
const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice: totalPrice,
  items: items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Pizza>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    incItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartItemSelectById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const cartSelect = (state: RootState) => state.cart;

export const { addItem, incItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
