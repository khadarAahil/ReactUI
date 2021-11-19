import axios from "axios";

const BASE_URL = "http://localhost:8085/api/v1/account";

const httpHeaders = { "content-type": "application/json" };

const getAllAccounts = () => {
  return axios.get(`${BASE_URL}/allAccounts`);
};

const getAccountById = (id) => {
  return axios.get(`${BASE_URL}/${id}`, { httpHeaders });
};

const createAccount = (account) => {
  return axios.post(`${BASE_URL}`, account);
};

const updateAccount = (id, account) => {
  return axios.put(`${BASE_URL}/${id}`, account);
};

const deleteAccount = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export default  {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
};
