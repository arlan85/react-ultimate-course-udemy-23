import { createStore } from "redux";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  // init state with initial state
  switch (action.type) {
    case "account/deposit": {
      //used to be writed as "SET_BALANCE" or 'DEPOSIT_ACCOUNT' the expressed content is the suggested by the team of redux
      return { ...state, balance: state.balance + action.payload };
    }
    case "account/withdraw": {
      return { ...state, balance: state.balance - action.payload };
    }
    case "account/requestLoan": {
      if (state.loan > 0) return state;
      // FOR LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    }
    case "account/payLoan": {
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    }

    default:
      return state; //do not throw an error
  }
}

//Redux feature

const store = createStore(reducer);

store.dispatch({ type: "account/deposit", payload: 500 }); // same as the useReducer function

console.log("Hey Redux");
console.log(store.getState());
store.dispatch({ type: "account/withdraw", payload: 200 });
console.log(store.getState());

store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 4000, purpose: "buy a car" },
});
console.log(store.getState());

store.dispatch({
  type: "account/payLoan",
});
console.log(store.getState());

26