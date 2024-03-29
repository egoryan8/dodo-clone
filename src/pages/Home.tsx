import React from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { useAppDispatch } from '../redux/store';
import { filterSelect } from '../redux/filter/selectors';
import { pizzaSelect } from '../redux/pizza/selectors';
import { setCategory, setFilters } from '../redux/filter/slice';
import { SearchParams } from '../redux/pizza/types';
import { fetchPizzas } from '../utils/asyncActions';

const Home: React.FC = () => {
  const { categoryId, sort, searchValue } = useSelector(filterSelect);
  const { items, status } = useSelector(pizzaSelect);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const setCategoryId = React.useCallback((i: number) => {
    dispatch(setCategory(i));
  }, []);

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';
    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
      }),
    );
  };

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         sort: sort || sortList[0],
  //       }),
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue]);

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId: categoryId,
  //     });

  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty]);

  const pizzas = items.map((obj: any) => <PizzaBlock {...obj} key={obj.id} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={setCategoryId} />
        <Sort sort={sort} />
      </div>

      <div className="content__title-wrapper">
        <h2 className="content__title">Все пиццы</h2>
      </div>
      {status === 'error' ? (
        <div className="content__error">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>Не удалось загрузить пиццы. Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
    </div>
  );
};

export default Home;
