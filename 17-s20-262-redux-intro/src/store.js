import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

//root Reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//Redux feature
const store = createStore(rootReducer, 
  // composeWithDevTools(applyMiddleware(thunk)),
  applyMiddleware(thunk));

export default store;
