import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  // cart: [], // we do not require extra data because other can be derived from the cotnent here
  cart: [
    {
      pizzaId: 12,
      name: 'Mediterranean',
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // updates
    addItem(state, action) {
      //payload = newItem
      const item = state.cart.find(
        (item) => item.pizzaId === action.payload.pizzaId,
      );
      if (!item) {
        state.cart.push(action.payload);
      } else {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    deleteItem(state, action) {
      state.cart = state.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  clearCart,
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} = cartSlice.actions; // dispatch action creators
export default cartSlice.reducer; // the reducer
