import { GET_INSTITUTIONS } from "../actions/types";

const initialState = {
	loaded: false,
	institutions: [],
	account_number: null,
	routing_number: null,
	bank_name: null,
	bank_nickname: null,
	bank_address: null,
	bank_location: null	
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_INSTITUTIONS:
      return {
      	...state,
      	loaded: true,
      	institutions: action.payload      	
      }  	
    default:
      return state;
  }
}