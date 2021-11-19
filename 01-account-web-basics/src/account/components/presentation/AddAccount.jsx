import React, { useState, useEffect } from "react";
import AccountService from "../../services/account-service";

const addAccountInput = {
  accountName: "",
  city: "",
  state1: "",
  phoneNumber: 0,
  accountType: "",
  amount: 0,
};

const AddAccount = (props) => {
  const [isNew, setIsNew] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [amount, setAmount] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [state1, setState1] = useState("");

  useEffect(() => {
    const accId = props.match.params.accId;
    setAccountId(accId);
    console.log("add account, id: " + accId);
    if (accId === "new") {
      setIsNew(true);
    }
    getAccountByAccountId(accId);
  }, [accountId]);

  const setAccountDataToFormFields = (account) => {
    setAccountName(account.name);
    setAccountType(account.accountType);
    setAmount(account.balanceAmount);
    setCity(account.address.city);
    setState1(account.address.state);
    setPhone(account.phoneNumber);
  };

  const addAccountSubmitHandler = (e) => {
    console.log("Add account form submitted!");
    e.preventDefault();

    addAccountInput.accountName = accountName;
    addAccountInput.accountType = accountType;
    addAccountInput.amount = +amount;
    addAccountInput.phoneNumber = +phone;
    addAccountInput.city = city;
    addAccountInput.state1 = state1;

    console.log("addAccountInput 123: " + JSON.stringify(addAccountInput));
    console.log("New request: "+isNew);
    if (isNew) {
      AccountService.createAccount(addAccountInput)
        .then((response) => console.log(response))
        .catch((error) => {
          console.log(error);
        });
    } else {
      AccountService.updateAccount(+accountId, addAccountInput);
    }

    props.history.push("/accounts");
  };

  const cancelBtnClickHandler = (e) => {
    console.log("Cancel button clicked!");
    e.preventDefault();
    props.history.push("/accounts");
  };

  const getAccountByAccountId = async (accId) => {
    console.log("isNew: " + isNew);
    if (isNew) {
      return;
    }
    const response = await AccountService.getAccountById(accId);

    if (response.status !== 200) {
      throw new Error("Something went wrong!");
    }
    if (response) {
      const selectedAcc = await response.data;
      console.log("selectedAcc: " + JSON.stringify(selectedAcc));
      setAccountDataToFormFields(selectedAcc);
    }
  };

  return (
    <div className="container">
      <h2>Add Account form</h2>
      <form onSubmit={addAccountSubmitHandler}>
        <div className="form-group">
          <label htmlFor="accountName">Account Name</label>
          <input
            type="text"
            className="form-control"
            id="accountName"
            placeholder="accountName"
            value={accountName || ""}
            name="accountName"
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <div>
            <label htmlFor="accountName">Account Type</label>
          </div>
          <div className="form-check-inline">
            <label className="form-check-label" htmlFor="accountType">
              <input
                type="radio"
                className="form-check-input"
                id="accountType"
                name="accountType"
                value="SAVINGS"
                checked={accountType === "SAVINGS"}
                onChange={(e) => setAccountType(e.target.value)}
              />
              Savings
            </label>
          </div>
          <div className="form-check-inline">
            <label className="form-check-label" htmlFor="accountType">
              <input
                type="radio"
                className="form-check-input"
                id="accountType"
                name="accountType"
                value="CURRENT"
                checked={accountType === "CURRENT"}
                onChange={(e) => setAccountType(e.target.value)}
              />
              Current
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            placeholder="Enter amount"
            value={amount || ""}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="Enter city"
            value={city || ""}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            type="number"
            className="form-control"
            id="phoneNumber"
            placeholder="Enter phone"
            value={phone || ""}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <select
            className="custom-select mr-sm-2"
            id="state"
            value={state1}
            onChange={(e) => setState1(e.target.value)}
          >
            <option value=""></option>
            <option value="AP">AP</option>
            <option value="KA">KA</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          className="btn btn-danger"
          style={{ marginLeft: "10px" }}
          onClick={cancelBtnClickHandler}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddAccount;
