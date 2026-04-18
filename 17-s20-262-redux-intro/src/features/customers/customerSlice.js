const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

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
}
