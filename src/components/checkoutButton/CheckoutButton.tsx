
import React from 'react';
import { useSelector } from 'react-redux';

import { selectIsCalculatingBasket, selectBasketTotal } from '../../store/basket/basketReducer';

import './CheckoutButton.scss';

function CheckoutButton() {
  const isCalculatingBasket = useSelector(selectIsCalculatingBasket)
  const total = useSelector(selectBasketTotal)

  return (
    <button className="checkout-button" disabled={isCalculatingBasket}>
      {isCalculatingBasket ? 'please wait...' : `Checkout and Pay now. ${total}`}
    </button>
  )
}

export default CheckoutButton;