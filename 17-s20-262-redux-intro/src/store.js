
import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

//root Reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//Redux feature
const store = createStore(rootReducer);

export default store;

