
/*So basically, configure store does a lot of things automatically for us
so it automatically will combine our reducers, it will automatically add the Thunk middleware,
and it will even automatically set up the developer tools*/
import {configureStore} from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});


export default store;
