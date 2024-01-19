// Externals
import { Action, Dispatch } from 'redux';
import axios from 'axios';

import BasketItem from '../../models/BasketItem';
import { IState } from '../rootReducer';

export function updateBasket(
  id: BasketItem['id'],
  quantity: BasketItem['quantity']
) {
  return (dispatch: Dispatch<Action>, getState: () => IState) => {
    const state: IState = getState();

    const basketItems = state.basket.items.map(item => {
      if (item.id !== id) return item;

      return {
        ...item,
        quantity,
      };
    });

    dispatch({
      type: 'update-basket',
      payload: basketItems,
    });

    if (state.basket.previousRequest) {
      clearTimeout(state.basket.previousRequest);
    }

    const previousRequest = setTimeout(() => {
      dispatch({
        type: 'previous_request',
        payload: null,
      });
      dispatch({
        type: 'calculating_basket',
        payload: true,
      });
    
      const onSuccess = () => {
        const newTotal = basketItems.reduce((previousValue: number, currentValue) => {
          const basketItemTotal = currentValue.itemPrice * currentValue.quantity;
      
          return previousValue + basketItemTotal;
        }, 0);

        dispatch({
          type: 'update-basket-totals',
          payload: newTotal,
        });
      }

      const onFail = () => {
        dispatch({
          type: 'calculating_basket',
          payload: true,
        });
      }
    
      return validateBasketTotalValue(onSuccess, onFail);
    }, 3000);

    dispatch({
      type: 'previous_request',
      payload: previousRequest,
    });
  };
}

const validateBasketTotalValue = (
  onSuccess: () => void,
  onFail: () => void
) => {
  axios
    .get('https://2486713dae314753ae6b0ff127002d12.api.mockbin.io/')
    .then(onSuccess)
    .finally(onFail);
};
