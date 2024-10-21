

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false
};

// async function convert(fromCurrency, toCurrency, amount) {
//   fetch(`https://api.frankfurter.app/latest?base=${fromCurrency}&symbols=${toCurrency}`)
//     .then((resp) => resp.json())
//     .then((data) => {
//       const convertedAmount = (amount * data.rates[toCurrency]).toFixed(2);
//       // alert(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
//       console.log(`the converted amount is ${convertedAmount}`);
//       return convertedAmount;
//     });
//   }

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false
      };
    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload
      };
    case 'account/requestLoan':
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan
      };
    case 'account/currencyConversion':
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};

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
    const convertedAmount = (amount * data.rates["USD"]).toFixed(2);
   
   // dispatch the action to deposit in USD
   dispatch({type: 'account/deposit', payload: convertedAmount});
  };
};

export function withdraw(amount) {
  return {
    type: 'account/withdraw',
    payload: amount
  };
};

export function requestLoan(amount, loanPurpose) {
  return {
    type: 'account/requestLoan',
    payload: {
      amount,
      loanPurpose
    }
  };
};

export function payLoan() {
  return {
    type: 'account/payLoan'
  };
};


