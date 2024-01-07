
import { Action } from "redux";

import BasketItem from '../../models/BasketItem';
import { ActionWithPayload } from "../types/actions";
import { IState } from "../rootReducer";
import { BasketActionTypes } from "./basketActionTypes";

export interface BasketState {
  calculatingBasketInApi: boolean;
  items: Array<BasketItem>,
  total: number,
  latestResponse: BasketItem | null,
}

export const initialState: BasketState = {
  calculatingBasketInApi: false,
  items: [
    new BasketItem(1, 'Burger 1', 100),
    new BasketItem(2, 'Burger 2', 200),
  ],
  total: 300,
  latestResponse: null
};

export default function basketReducer(
  state: BasketState = { ...initialState },
  action: Action
): BasketState {
  switch (action.type) {
    case BasketActionTypes.CALCULATING_BASKET:
      return {
        ...state,
        calculatingBasketInApi: (action as ActionWithPayload<boolean>).payload
      }
    case BasketActionTypes.UPDATE_BASKET:
      return {
        ...state,
        items: (action as ActionWithPayload<Array<BasketItem>>).payload
      }
    case BasketActionTypes.UPDATE_BASKET_TOTALS:
      return {
        ...state,
        total: (action as ActionWithPayload<number>).payload
      }
    case BasketActionTypes.FINISH_REQUEST:
      return {
        ...state,
        latestResponse: (action as ActionWithPayload<BasketItem>).payload
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