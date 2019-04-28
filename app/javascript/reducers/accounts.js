import { GET_ACCOUNTS, ADD_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT } from "../actions/types";

const initialState = {
	loaded: false,
	saved: false,
	accounts: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ACCOUNTS:
      return {
      	...state, 
      	accounts: action.payload, 
      	loaded: true
      }  
    case ADD_ACCOUNT:
      return {
      	...state, 
      	accounts: [...state.accounts, action.payload]
      }
    case UPDATE_ACCOUNT:
      return {
      	...state,
      	saved: true
      }            
    case DELETE_ACCOUNT:
      return {
      	...state, 
      	accounts: state.accounts.filter(account => account.id !== action.payload)
      }
    default:
      return state;
  }
}
