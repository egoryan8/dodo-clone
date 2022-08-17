import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, cartItemSelectById } from '../redux/slices/cartSlice';
import Preloader from './Preloader';

const FullPizza: React.FC = () => {

  const { id } = useParams();

  const [pizza, setPizza] = React.useState<{
    name: string,
    price: number,
    imageUrl: string,
    id: string,
    sizes: [],
    types: [],
    size: string,
  }>();

  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);
  const dispatch = useDispatch();
  const cartItem = useSelector(cartItemSelectById(id));
  const addedCount = cartItem ? cartItem.count : 0;

  const typeNames = ['Тонкое', 'Традиционное'];

  React.useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(
          `https://6295d76075c34f1f3b2280f4.mockapi.io/pizzas/${id}`,
        );
        setPizza(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPizzas();
  }, []);

  if (!pizza) {
    return <Preloader />;
  }
  const onClickAdd = () => {
    const item = {
      id: pizza.id,
      name: pizza.name,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: typeNames[activeType],
      size: pizza.sizes[activeSize],
    };
    dispatch(addItem(item));
  };


  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <div>
          <h4 className="pizza-block__title">{pizza.name}</h4>
          <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
        </div>

        <div className="pizza-block__selector">
          <ul>
            {pizza.types.map((typeId:number) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? 'active' : ''}>
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {pizza.sizes.map((size:string, index) => (
              <li
                key={size}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? 'active' : ''}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {pizza.price} ₽</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
