import axios from 'axios';
import { GET_ACCOUNTS, ADD_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT } from './types';

export const getAccounts = () => (dispatch, getState) => (
	new Promise(resolve => {
		axios.get('/api/v1/accounts', getState)
			.then(({ data }) => {
				resolve(dispatch({ type: GET_ACCOUNTS, payload: data }));
			})
			.catch(error => console.log(error))		
	})
)

export const addAccount = account => (dispatch) => (
	new Promise(resolve => {
		axios.post('/api/v1/accounts', account)
			.then(({ data }) => {
				resolve(dispatch({ type: ADD_ACCOUNT, payload: data }));
			})
			.catch(error => console.log(error))		
	})
)

export const updateAccount = account => (dispatch) => (
	new Promise(resolve => {
		axios.patch('/api/v1/accounts', account)
			.then(({ data }) => {
				resolve(dispatch({ type: UPDATE_ACCOUNT, payload: data }));
			})
			.catch(error => console.log(error))		
	})
)

export const deleteAccount = id => (dispatch) => (
	new Promise(resolve => {
	  axios.delete('/api/v1/accounts', { params: { id } })
		.then(({ data }) => {
	    resolve(dispatch({ type: DELETE_ACCOUNT, payload: data }));
		})
		.catch(error => console.log(error))		
	})
)
