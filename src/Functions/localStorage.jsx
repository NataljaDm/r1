import { v4 as uuidv4 } from 'uuid';

const KEY = "accounts";

const read = key => {
    const value = localStorage.getItem(key);
    if (null === value) {
        return [];
    }
    return JSON.parse(value);
}

const write = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const get = key => read(key);

export const show = (key, id) => {
    const items = read(key);
    return items.find(item => item.id === id);
}

export const store = (key, value) => {
    const items = read(key);
    value.id = uuidv4();
    items.push(value);
    write(key, items);
}

export const destroy = (key, id) => {
    const items = read(key);
    const newItems = items.filter(item => item.id !== id);
    write(key, newItems);
}

export const update = (key, id, value) => {
    const items = read(key);
    const newItems = items.map(item => {
        if (item.id === id) {
            return {...value, id: id};
        }
        return item;
    });
    write(key, newItems);
}
export const getAccounts = () => {
    const accountsJSON = localStorage.getItem(KEY);
    return JSON.parse(accountsJSON);
  };

  export const updateAccountBalance = (accountId, newBalance) => {
    const accounts = getAccounts();
    const updatedAccounts = accounts.map((account) => {
      if (account.id === accountId) {
        account.balance = newBalance;
      }
      return account;
    });
    localStorage.setItem(KEY, JSON.stringify(updatedAccounts));
  };