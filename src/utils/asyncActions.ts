import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchParams } from '../redux/pizza/types';

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
