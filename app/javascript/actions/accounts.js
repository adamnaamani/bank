import axios from 'axios';
import { GET_ACCOUNTS, ADD_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT, GET_ERRORS } from './types';

// GET ACCOUNTS
export const getAccounts = () => (dispatch, getState) => {
	return new Promise(resolve => {
	  axios.get('/api/v1/accounts', getState).then(response => {
	    dispatch({
	      type: GET_ACCOUNTS,
	      payload: response.data.accounts
	    })
	    resolve();
	  }).catch(error => console.log(error))		
	})
}

// ADD ACCOUNT
export const addAccount = account => (dispatch, getState) => {
	return new Promise(resolve => {
	  axios.post("/api/v1/add_account", account).then(response => {
	  	if(response.status == 'ok') {
		    dispatch({
		      type: ADD_ACCOUNT,
		      payload: response.data
		    })
	  	}
	  	else {
		  	dispatch({
		  		type: GET_ERRORS,
		  		payload: response.data
		  	})  		
	  	}
	  	resolve();
	  })		
	})
}

// UPDATE ACCOUNT
export const updateAccount = account => (dispatch, getState) => {
	return new Promise(resolve => {
	  axios.post("/api/v1/update_account", account).then(response => {
	    dispatch({
	      type: UPDATE_ACCOUNT,
	      payload: response.data
	    })
	    resolve();
	  }).catch(error => console.log(error))		
	})
}

// DELETE ACCOUNT
export const deleteAccount = id => (dispatch, getState) => {
	return new Promise(resolve => {
	  axios.delete("/api/v1/delete_account", {
	  	params: { 
	  		id: id 
	  	}
	  }).then(response => {
	    dispatch({
	      type: DELETE_ACCOUNT,
	      payload: id
	    })
	    resolve();
	  }).catch(error => console.log(error))		
	})
}
