import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/user/userSlice';

const store = configureStore({ //connect the slices with the global state 
  reducer: {
    user: userReducer,
  },
});

export default store;