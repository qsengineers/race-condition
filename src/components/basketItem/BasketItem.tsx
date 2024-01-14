import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import BasketItemModel from '../../models/BasketItem';
import { updateBasket } from '../../store/basket/basketActions';

import './basketItem.scss';

interface BasketItemProps {
  basketItem: BasketItemModel;
}

function BasketItem({ basketItem }: BasketItemProps) {
  const dispatch = useDispatch();

  const onMinusButtonClick = useCallback(() => {
    const { id, quantity } = basketItem;
    if (quantity <= 1) return;
    dispatch(updateBasket(id, quantity - 1));
  }, [basketItem, dispatch]);

  const onPlusButtonClick = useCallback(() => {
    const { id, quantity } = basketItem;
    dispatch(updateBasket(id, quantity + 1));
  }, [basketItem, dispatch]);

  return (
    <div className='basket-item'>
      <p className='basket-item--info basket-item__name'>
        Item Name <span>{basketItem.name}</span>
      </p>
      <div className='basket-item--info basket-item__quantity'>
        Quantity
        <div className='basket-item__actions'>
          <button className='basket-item__button' onClick={onMinusButtonClick}>
            -
          </button>
          <span>{basketItem.quantity}</span>
          <button className='basket-item__button' onClick={onPlusButtonClick}>
            +
          </button>
        </div>
      </div>
      <p className='basket-item--info basket-item__total'>
        Total <span> {basketItem.itemPrice * basketItem.quantity}</span>
      </p>
    </div>
  );
}

export default BasketItem;
