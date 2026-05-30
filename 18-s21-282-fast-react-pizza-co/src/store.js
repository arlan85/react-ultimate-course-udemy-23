import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/user/userSlice';
import cartReducer from './modules/cart/cartSlice';


const store = configureStore({ //connect the slices with the global state 
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;