import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Sort } from './filterSlice';

export type SearchParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://6295d76075c34f1f3b2280f4.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}&${search}`,
    );
    return data;
  },
);

export type Pizza = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  sizes?: number[];
  types?: number[];
  type: string;
  size: number;
};

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzasSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING, // loading | succes | error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const pizzaSelect = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
