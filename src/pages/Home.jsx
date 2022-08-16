import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { SearchContext } from '../App';
import { setCategory } from '../redux/slices/filterSlice';

const Home = () => {
  const { categoryId, sort } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const setCategoryId = (i) => {
    dispatch(setCategory(i));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    axios
      .get(
        `https://6295d76075c34f1f3b2280f4.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}&${search}`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue]);

  const items = pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={setCategoryId} />
        <Sort />
      </div>
      <div className="content__title-wrapper">
        <h2 className="content__title">Все пиццы</h2>
      </div>
      <div className="content__items">{isLoading ? skeletons : items}</div>
    </div>
  );
};

export default Home;
