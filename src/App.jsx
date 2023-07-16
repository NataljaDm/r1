import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Button.scss";
import { useEffect, useState } from "react";
import { get, store, updateAccountBalance } from "./Functions/localStorage";
import Delete from "./components/Delete";

export const KEY = "accounts";

function App() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [balance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [accounts, setAccounts] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [deleteData, setDeleteData] = useState(null);

  const handleCreate = () => {
    const accountDetails = {
      name,
      lastName,
      balance: parseInt(balance),
    };
    store(KEY, accountDetails);
    setName("");
    setLastName("");
    setLastUpdate(Date.now());
  };

  useEffect(() => {
    setAccounts(get(KEY));
  }, [lastUpdate]);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleChangeAmount = (event) => {
    setAmount(parseFloat(event.target.value));
  };

  const handleAddFunds = (accountId) => {
    const updatedAccounts = accounts.map((account) => {
      if (account.id === accountId) {
        const newBalance = account.balance + amount;
        updateAccountBalance(account.id, newBalance);
        return { ...account, balance: newBalance };
      }
      return account;
    });
    setAccounts(updatedAccounts);
    setAmount(0);
    setLastUpdate(Date.now());
  };

  const handleChargeFunds = (accountId) => {
    const updatedAccounts = accounts.map((account) => {
      if (account.id === accountId) {
        const newBalance = account.balance - amount;
        const isBiggerThanZero = newBalance < 0 ? 0 : newBalance;
        updateAccountBalance(account.id, isBiggerThanZero);
        return { ...account, balance: newBalance };
      }
      return account;
    });
    setAccounts(updatedAccounts);
    setAmount(0);
    setLastUpdate(Date.now());
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div className="container">
            <div className="row">
              <div className="col-12 col d-flex justify-content-center">
                <div className="card">
                  <h1 className="card-header">Create new bank account</h1>
                  <div className="card-body">
                    <div className="card-title">
                      <fieldset>
                        <legend>Person information</legend>
                        <div>
                          <legend>
                            Name:
                            <input
                              type="text"
                              value={name}
                              onChange={handleChangeName}
                            />
                          </legend>
                          <legend>
                            Last Name:
                            <input
                              type="text"
                              value={lastName}
                              onChange={handleChangeLastName}
                            />
                          </legend>
                        </div>
                        <button className="blue small" onClick={handleCreate}>
                          Create New Account!
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card mt-4">
                <h1 className="card-header">Bank Accounts</h1>
                <div className="card-body"></div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Account Balance</th>
                      <th>Enter Amount</th>
                      <th>Edit Balance</th>
                      <th>Account settings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts &&
                      accounts.map((account) => (
                        <tr key={account.id}>
                          <td>
                            {account.name + " "}
                            {account.lastName}
                          </td>
                          <td>${account.balance.toFixed(2)}</td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={account.amount}
                              placeholder="Money"
                              onChange={handleChangeAmount}
                            />
                          </td>
                          <td>
                            <button
                              className="green small"
                              onClick={() => handleAddFunds(account.id)}
                            >
                              Add Funds
                            </button>
                            <button
                              className="green small"
                              onClick={() => handleChargeFunds(account.id)}
                            >
                              Charge Funds
                            </button>
                          </td>
                          <td>
                            <button
                              className="red small"
                              onClick={(_) => setDeleteData(account)}
                            >
                              DELETE ACCOUNT
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {deleteData && (
            <Delete
              setDeleteData={setDeleteData}
              deleteData={deleteData}
              setLastUpdate={setLastUpdate}
            />
          )}
        </header>
      </div>
    </>
  );
}

export default App;