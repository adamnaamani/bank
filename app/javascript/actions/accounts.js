import axios from 'axios';
import { GET_ACCOUNTS, ADD_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT } from './types';

// GET ACCOUNTS
export const getAccounts = () => (dispatch, getState) => {
  axios.get('/api/v1/accounts', getState).then(response => {
    dispatch({
      type: GET_ACCOUNTS,
      payload: response.data.accounts
    })
  }).catch(error => console.log(error))
}

// ADD ACCOUNT
export const addAccount = account => (dispatch, getState) => {
  axios.post("/api/v1/add_account", account).then(response => {
    dispatch({
      type: ADD_ACCOUNT,
      payload: response.data
    })
  }).catch(error => console.log(error))
}

// UPDATE ACCOUNT
export const updateAccount = account => (dispatch, getState) => {
  axios.post("/api/v1/update_account", account).then(response => {
  	console.log(response)
    dispatch({
      type: UPDATE_ACCOUNT,
      payload: response.data
    })
  }).catch(error => console.log(error))
}

// DELETE ACCOUNT
export const deleteAccount = id => (dispatch, getState) => {
  axios.post("/api/v1/delete_account", { id: id }).then(response => {
    dispatch({
      type: DELETE_ACCOUNT,
      payload: id
    })
  }).catch(error => console.log(error))
}
