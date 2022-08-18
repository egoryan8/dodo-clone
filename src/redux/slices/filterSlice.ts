import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Sort = {
  name: string;
  sortProperty: 'rating' | 'price' | 'name' | '-name' | '-price' | '-rating';
};

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: { name: 'популярности', sortProperty: 'rating' },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const filterSelect = (state: RootState) => state.filter;

export const sortSelect = (state: RootState) => state.filter.sort;

export const { setCategory, setSort, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
