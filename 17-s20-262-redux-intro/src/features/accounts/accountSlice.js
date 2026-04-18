const initialStateAccount = {
  balance: { amount: 0, currency: "USD" },
  loan: 0,
  loanPurpose: "",
};

/** Back in the day, React developers also used to place these strings here into separate variables into a separate file.
 * this avoid typo issues and concentrate constants in a single place to manage all actions.
 * this is not in use anymore nowadays
 */
const bankActions = {
  DEPOSIT: "account/deposit",
  WITHDRAW: "account/withdraw",
  REQUEST_LOAN: "account/requestLoan",
  PAY_LOAN: "account/payLoan",
};

// store.dispatch({ type: "account/deposit", payload: 500 }); // same as the useReducer function
// console.log("Hey Redux");
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 4000, purpose: "buy a car" },
// });
// console.log(store.getState());
// store.dispatch({
//   type: "account/payLoan",
// });
// console.log(store.getState());

// ACTION CREATORS So basically, action creators are nothing more than simply functions, that return actions. So they are really not a Redux thing,
// and Redux would work perfectly fine without them, but they are a useful convention that Redux developers have used forever, basically.
export function deposit(amount) {
  return { type: bankActions.DEPOSIT, payload: amount };
}

export function withdraw(amount) {
  return { type: bankActions.WITHDRAW, payload: amount };
}

export function requestLoan({ amount, purpose }) {
  return {
    type: bankActions.REQUEST_LOAN,
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: bankActions.PAY_LOAN };
}

// store.dispatch(deposit(100));
// console.log(store.getState());
// store.dispatch(withdraw(50));
// console.log(store.getState());
// store.dispatch(requestLoan({ amount: 1000, purpose: "buy a car" }));
// console.log(store.getState());
// store.dispatch(payLoan());
// console.log(store.getState());

export default function accountReducer(state = initialStateAccount, action) {
  // init state with initial state
  switch (action.type) {
    case bankActions.DEPOSIT: {
      //used to be writed as "SET_BALANCE" or 'DEPOSIT_ACCOUNT' the expressed content is the suggested by the team of redux
      return {
        ...state,
        balance: {
          ...state.balance,
          amount: state.balance.amount + action.payload,
        },
      };
    }
    case bankActions.WITHDRAW: {
      return { ...state, balance: { ...state.balance, amount: state.balance.amount - action.payload } };
    }
    case bankActions.REQUEST_LOAN: {
      if (state.loan > 0) return state;
      // FOR LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: {...state.balance, amount: state.balance.amount + action.payload.amount},
      };
    }
    case bankActions.PAY_LOAN: {
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: { ...state.balance, amount: state.balance.amount - state.loan },
      };
    }

    default:
      return state; //do not throw an error
  }
}
