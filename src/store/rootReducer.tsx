
// Externals
import { combineReducers } from "redux";

// Reducers
import basketReducer, { BasketState } from './basket/basketReducer';

export interface IState {
  basket: BasketState;
}

const rootReducer = combineReducers({
  basket: basketReducer
});

export default rootReducer;