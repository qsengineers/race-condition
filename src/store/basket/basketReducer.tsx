
import { Action } from "redux";

import BasketItem from '../../models/BasketItem';
import { ActionWithPayload } from "../types/actions";
import { IState } from "../rootReducer";

export interface BasketState {
  calculatingBasketInApi: boolean;
  items: Array<BasketItem>,
  total: number
  previousRequest: null | number
}

export const initialState: BasketState = {
  calculatingBasketInApi: false,
  previousRequest: null,
  items: [
    new BasketItem(1, 'Burger 1', 100),
    new BasketItem(2, 'Burger 2', 200),
  ],
  total: 300
};

export default function basketReducer(
  state: BasketState = { ...initialState },
  action: Action
) {
  switch (action.type) {
    case 'calculating_basket':
      return {
        ...state,
        calculatingBasketInApi: (action as ActionWithPayload<boolean>).payload
      }
    case 'previous_request':
      return {
        ...state,
        previousRequest: (action as ActionWithPayload<number>).payload
      }
    case 'update-basket':
      return {
        ...state,
        items: (action as ActionWithPayload<Array<BasketItem>>).payload
      }
    case 'update-basket-totals':
      return {
        ...state,
        total: (action as ActionWithPayload<number>).payload
      }

    default:
      return state;
  }
}

export function selectBasketItems(state: IState): Array<BasketItem> {
  return state.basket.items;
}

export function selectIsCalculatingBasket(state: IState): boolean {
  return state.basket.calculatingBasketInApi;
}

export function selectBasketTotal(state: IState): number {
  return state.basket.total;
}