import { RootState } from '../store';

export const filterSelect = (state: RootState) => state.filter;

export const sortSelect = (state: RootState) => state.filter.sort;
