import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  cart: [], // we do not require extra data because other can be derived from the cotnent here
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
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
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

// reduce functions and  nono mutable actions over the cart can be expressed as extra common functions
export const getCartTotals = (state) =>
  state.cart.cart.reduce(
    (acc, elem) => {
      acc.totalItems += elem.quantity || 0;
      acc.totalPrice += elem.totalPrice;
      return acc;
    },
    { totalItems: 0, totalPrice: 0 },
  );

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) => // a function that returns another function
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
