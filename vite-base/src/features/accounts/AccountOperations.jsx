import React from 'react';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, requestLoan, withdraw } from "./accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const dispatch = useDispatch();
  const { isLoading, balance, loan} = useSelector((store) => store.account);
  
  console.log(balance);
 
 

  function handleDeposit() {
    if (!depositAmount) {
      // alert("Please fill in all fields");
      return;
      
    }
    dispatch(deposit(depositAmount, currency));
    // console.log('depositAmount');
    // console.log(depositAmount);
    // dispatch(deposit(depositAmount));

    setDepositAmount("");
    setCurrency("USD");

  }

  function handleWithdrawal() {
    if (!withdrawalAmount) {
      // alert("Please fill in all fields");
      return;
    } else if (withdrawalAmount > balance) {
      // alert("Insufficient funds");
      return;
    }
    dispatch(withdraw(withdrawalAmount));
    withdraw(withdrawalAmount);
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) {
      // alert("Please fill in all fields");
      return;
    }
    dispatch(requestLoan(loanAmount, loanPurpose));
    requestLoan(loanAmount, loanPurpose);
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    if (loan === 0) {
      alert("No loan to pay");
      return;
      
    } else if (loan > balance) {
      alert("Insufficient funds to pay loan");
      return;
    }
    dispatch({ type: "account/payLoan" });
    setLoanAmount("");
    setLoanPurpose("");

  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>
            {isLoading ? "Converting..." : `Deposit ${depositAmount}`}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>
        {loan > 0 && (
          <div>
            <span>Pay back ${loan} ({loanPurpose})</span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default AccountOperations;
