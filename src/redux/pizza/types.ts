export type SearchParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
};

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

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzasSliceState {
  items: Pizza[];
  status: Status;
}
