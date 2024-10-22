import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false
};



// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case 'account/deposit':
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false
//       };
//     case 'account/withdraw':
//       return {
//         ...state,
//         balance: state.balance - action.payload
//       };
//     case 'account/requestLoan':
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.loanPurpose,
//         balance: state.balance + action.payload.amount
//       };
//     case 'account/payLoan':
//       return {
//         ...state,
//         loan: 0,
//         balance: state.balance - state.loan
//       };
//     case 'account/currencyConversion':
//       return {
//         ...state,
//         isLoading: true
//       };
//     default:
//       return state;
//   }
// };



// export function withdraw(amount) {
//   return {
//     type: 'account/withdraw',
//     payload: amount
//   };
// };

// export function requestLoan(amount, loanPurpose) {
//   return {
//     type: 'account/requestLoan',
//     payload: {
//       amount,
//       loanPurpose
//     }
//   };
// };

// export function payLoan() {
//   return {
//     type: 'account/payLoan'
//   };
// };


const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
      
    },
    withdraw(state, action) {
      console.log('from withdraw');
      console.log(action);
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, loanPurpose: purpose }
        };
      },
      reducer(state, action) {
      
      if (state.loan > 0) {
        return;
        
      }
      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.loanPurpose;
      state.balance += action.payload.amount;
    }},
    payLoan(state) {
      console.log('from payLoan');
      console.log(state);
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },
    currencyConversion(state) {
      state.isLoading = true;
    }
  }
});
export function deposit(amount, currency) {
  if (currency === 'USD') {
    return {
      type: 'account/deposit',
      payload: amount
    };
  }
  return async function (dispatch, getState) {
    dispatch({type: 'account/currencyConversion'});
    // API call to get exchange rate
   const res = await fetch(`https://api.frankfurter.app/latest?base=${currency}&symbols=USD`);

    const data = await res.json();
    console.log('data from currencyConversion');
    console.log(data);
    const convertedAmount = (amount * data.rates["USD"]).toFixed(2);
   
   // dispatch the action to deposit in USD
   dispatch({type: 'account/deposit', payload: convertedAmount});
  };
};
console.log(accountSlice);
export const { withdraw, requestLoan, payLoan, currencyConversion } = accountSlice.actions;
export default accountSlice.reducer;
