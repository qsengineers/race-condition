
// Externals
import { Action, Dispatch } from 'redux';
import axios from 'axios'

import BasketItem from '../../models/BasketItem';
import { IState } from '../rootReducer';
import { BasketActionTypes } from './basketActionTypes';

export function incrementItem(basketItem: BasketItem) {
  return (dispatch: Dispatch<Action>, getState: () => IState) => {
    const state: IState = getState();

    // Call this same function after 3 seconds to avoid concurrency
    if (state.basket.calculatingBasketInApi) {
      return setTimeout(() => {
        return incrementItem(basketItem)(dispatch, getState);
      }, 3000);
    }

    dispatch({
      type: BasketActionTypes.CALCULATING_BASKET,
      payload: true
    });

    const basketItems = state.basket.items.map((item) => {
      if (item.id === basketItem.id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        }
      }

      return item;
    });

    const newTotal = basketItems.reduce((previousValue: number, currentValue) => {
      const basketItemTotal = currentValue.itemPrice * currentValue.quantity;

      return previousValue + basketItemTotal;
    }, 0);


    dispatch({
      type: BasketActionTypes.UPDATE_BASKET,
      payload: basketItems
    });

    // Simulate a real validate basket
    axios.get('https://2486713dae314753ae6b0ff127002d12.api.mockbin.io/')
      .then(function () {
        dispatch({
          type: BasketActionTypes.UPDATE_BASKET_TOTALS,
          payload: newTotal
        });
      })
      .finally(() => {
        dispatch({
          type: BasketActionTypes.FINISH_REQUEST,
          payload: basketItem
        });
        dispatch({
          type: BasketActionTypes.CALCULATING_BASKET,
          payload: false
        });
      })

  }
}

export function decrementItem(basketItem: BasketItem) {
  return (dispatch: Dispatch<Action>, getState: () => IState) => {
    const state: IState = getState();

    // Call this same function after 3 seconds to avoid concurrency
    if (state.basket.calculatingBasketInApi) {
      return setTimeout(() => {
        return incrementItem(basketItem)(dispatch, getState);
      }, 3000);
    }

    const foundItem = state.basket.items.find((item) => {
      return item.id === basketItem.id;
    });

    // Disabling 0 quantity
    if (foundItem?.quantity === 1) {
      return;
    }

    dispatch({
      type: BasketActionTypes.CALCULATING_BASKET,
      payload: true
    });

    const basketItems = state.basket.items.map((item) => {
      if (item.id === basketItem.id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        }
      }

      return item;
    });

    const newTotal = basketItems.reduce((previousValue: number, currentValue) => {
      const basketItemTotal = currentValue.itemPrice * currentValue.quantity;

      return previousValue + basketItemTotal;
    }, 0);

    dispatch({
      type: BasketActionTypes.UPDATE_BASKET,
      payload: basketItems
    });

    // Simulate a real validate basket
    axios.get('https://2486713dae314753ae6b0ff127002d12.api.mockbin.io/')
      .then(function () {
        dispatch({
          type: BasketActionTypes.UPDATE_BASKET_TOTALS,
          payload: newTotal
        });
      })
      .finally(() => {
        dispatch({
          type: BasketActionTypes.FINISH_REQUEST,
          payload: basketItem
        });
        dispatch({
          type: BasketActionTypes.CALCULATING_BASKET,
          payload: false
        });
      })
  }
}