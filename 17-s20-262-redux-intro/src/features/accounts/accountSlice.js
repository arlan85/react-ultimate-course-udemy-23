/**
 This create slice function here gives us three big benefits.

  1-  it'll automatically create action creators from our reducers.
  2- It makes writing these reducers a lot easier because we no longer need that switch statement and also the default case is automatically handled.
  3- We can actually mutate now, our state inside reducers. 

*/
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: { amount: 0, currency: "USD" },
  loan: 0,
  loanPurpose: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      // we can write mutating logic
      state.balance.amount += Number(action.payload); //we mutate the state directly here, but under the hood, createSlice will take care of creating a new state object for us, so we don't have to worry about immutability at all.
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance.amount -= Number(action.payload);
    },
    requestLoan(state, action) { // this works because i from the first time i create and object instead of passing more than one argument
      if (state.loan > 0) return;
      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.purpose;
      state.balance.amount += Number(action.payload.amount);
    },
    /** So basically, what we have to do is to prepare the data before it reaches the reducer.
      And so what we have to do now here is to separate this. So here, we now need a new object.
      So let's open that there and then close that right here. And then we need to call this function here,
      just the reducer and then before that, we need to prepare that data with a prepare method.
      And so this method is where we can then accept the data that we want.
      So basically this can have the parameters that earlier we had in our action creator. */
    requestLoanCourseExplained: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose }, //to receive more than one argument
        }
      },
      reduce(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance.amount += Number(action.payload.amount);
      },
    },
    payLoan(state) {
      state.balance.amount -= Number(state.loan);
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;

    },
  },
});

console.log(accountSlice);


// implement a thunk but no in a react/toolkit way, this works as expected
export function deposit(amount, currency = "USD") {
  if (currency === "USD") {
    return { type: 
      "account/deposit", payload: amount };
  }

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    //api call to exchange the currency to USD
    const to = "USD";
    const content = await fetch(
      `https://api.frankfurter.dev/v2/rate/${currency}/${to}`,
    );
    const data = await content.json();
    console.log("currency->>>", data);

    const convertedAmount = (amount * data.rate).toFixed(2);
    console.log(`${amount} ${currency} is equal to ${convertedAmount} ${to}`);

    //return action
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

export const { withdraw, requestLoan, payLoan } = accountSlice.actions; //we need to remove the other action creator to  avoide use the ones that does not have the async action

export default accountSlice.reducer;

// V-1
/** Back in the day, React developers also used to place these strings here into separate variables into a separate file.
 * this avoid typo issues and concentrate constants in a single place to manage all actions.
 * this is not in use anymore nowadays
 */
/*const bankActions = {
  DEPOSIT: "account/deposit",
  WITHDRAW: "account/withdraw",
  REQUEST_LOAN: "account/requestLoan",
  PAY_LOAN: "account/payLoan",
  COVERTING_CURRENCY: "account/convertingCurrency",
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
export function deposit(amount, currency = "USD") {
  if (currency === "USD") {
    return { type: bankActions.DEPOSIT, payload: amount };
  }

  return async function (dispatch, getState) {
    dispatch({ type: bankActions.COVERTING_CURRENCY });
    //api call to exchange the currency to USD
    const to = "USD";
    const content = await fetch(
      `https://api.frankfurter.dev/v2/rate/${currency}/${to}`,
    );
    const data = await content.json();
    console.log("currency->>>", data);

    const convertedAmount = (amount * data.rate).toFixed(2);
    console.log(`${amount} ${currency} is equal to ${convertedAmount} ${to}`);

    //return action
    dispatch({ type: bankActions.DEPOSIT, payload: convertedAmount });
  };
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
          amount: state.balance.amount + Number(action.payload),
        },
        isLoading: false,
      };
    }
    case bankActions.WITHDRAW: {
      return {
        ...state,
        balance: {
          ...state.balance,
          amount: state.balance.amount - Number(action.payload),
        },
      };
    }
    case bankActions.REQUEST_LOAN: {
      if (state.loan > 0) return state;
      // FOR LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: {
          ...state.balance,
          amount: state.balance.amount + Number(action.payload.amount),
        },
      };
    }
    case bankActions.PAY_LOAN: {
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: {
          ...state.balance,
          amount: state.balance.amount - Number(state.loan),
        },
      };
    }
    case bankActions.COVERTING_CURRENCY: {
      return {
        ...state,
        isLoading: true,
      };
    }

    default:
      return state; //do not throw an error
  }
}
*/
