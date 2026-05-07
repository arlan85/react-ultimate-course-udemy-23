import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer(state, action) {
      /** // I've using objects as good practice but in case ther were separated params, we need to use the
       * prepare function to return an object payload, or if we need to add other options like a random id or a date can be added
       * prepare(fullName, nationalId) {
       * return {
       * payload: { fullName, nationalId createdAt: new Date().toISOString()},
       * },
       * //then use the reducer function to handle the logic of the reducer
       * reduce(state, action) {
       * state.fullName = action.payload.fullName;
       * state.nationalId = action.payload.nationalId;
       * state.createdAt = action.payload.createdAt;
       * }
       *
       */
      state.fullName = action.payload.fullName;
      state.nationalId = action.payload.nationalId;
      state.createdAt = new Date().toISOString();
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;

/* V1 without redux toolkit
// customer
export function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalId,
    }, //the date here is a side effect so it does not belong onto the reducer
    createdAt: new Date().toISOString(),
  };
}

export function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

// store.dispatch(createCustomer("Jhon Doe", "2323232333"));
// console.log(store.getState());
// store.dispatch(updateName("Carl Montgomery"));
// console.log(store.getState());
// store.dispatch(deposit(300));
// console.log(store.getState());

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer": {
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.createdAt,
      };
    }
    case "customer/updateName": {
      return {
        ...state,
        fullName: action.payload,
      };
    }
    default:
      return state;
  }
} */
