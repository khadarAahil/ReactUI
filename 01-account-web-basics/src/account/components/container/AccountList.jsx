import React, { useState, useEffect } from "react";
import AccountService from "../../services/account-service";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AccountList = (props) => {
  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    const authFlag = localStorage.getItem("isLoggedIn");
    console.log("authFlag: " + authFlag);
    if (!authFlag) {
      props.history.push("/login");
      return;
    }
    getAccounts();
    return () => {
      console.log("Cleanup is running...");
    };
  }, []);

  function getAccounts() {
    const accountList = AccountService.getAllAccounts()
      .then((response) => {
        setAccountList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        //Write ErrorHandler code here...
        console.log(error);
      });
  }

  const addAccountBtnHandler = () => {
    setAccountList(getAccounts);
    props.history.push(`/add-account/new`);
  };

  const deleteAccountBtnHandler = (accountId) => {
    console.log("delete account id: " + accountId);
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure want to delete.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await AccountService.deleteAccount(accountId);
            console.log(response);
            setAccountList(getAccounts);
            props.history.push(`/accounts`);
          },
        },
        {
          label: "No",
          onClick: () => props.history.push(`/accounts`),
        },
      ],
    });
  };

  return (
    <div className="container">
      <h2 className="text-center">Account List</h2>
      <div class="card">
        <div class="card-header">
          <button className="btn btn-primary" onClick={addAccountBtnHandler}>
            Add Account
          </button>
        </div>
        <div class="card-body">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Open Date</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {accountList &&
                accountList.map((account, index) => (
                  <tr key={index}>
                    <td>{account.id}</td>
                    <td>{account.name}</td>
                    <td>{account.accountType}</td>
                    <td>{account.balanceAmount}</td>
                    <td>{account.openDt}</td>
                    <td>{account.phoneNumber}</td>
                    <td>
                      {account.address.city + ", " + account.address.state}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            props.history.push("add-account/" + account.id);
                            setAccountList(getAccounts());
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteAccountBtnHandler(account.id)}
                        >
                          delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountList;
