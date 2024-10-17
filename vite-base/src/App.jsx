import React from 'react';
import { useSelector } from 'react-redux';
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";

function App() {
  const customer = useSelector((state) => state.customer);  

  const fullName = customer.fullName;
  // if (customerName) {
  //   console.log("customerName");
  //   console.log(customerName);
  // } else {
  //   console.log("No customerName");
  // }

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName === '' ? <CreateCustomer /> 
        :
       <>  
        <Customer />
        <AccountOperations />
        <BalanceDisplay />
      </>
      }
     
    </div>
  );
}

export default App;
