
import React from 'react';
import { useSelector } from 'react-redux';

import { selectBasketItems } from '../../store/basket/basketReducer';
import BasketItemModel from '../../models/BasketItem';
import BasketItemComponent from '../basketItem';
import CheckoutButton from '../checkoutButton';

import './basket.scss';

function Basket() {
  const basketItems = useSelector(selectBasketItems);

  return (
    <div className="basket">
      {
        basketItems.map((basketItem: BasketItemModel) => {
          return <BasketItemComponent key={basketItem.id} basketItem={basketItem} />
        })
      }

      <CheckoutButton />
    </div>
  )
}

export default Basket;