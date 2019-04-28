import { GET_INSTITUTIONS } from "../actions/types";

const initialState = {
	loaded: false,
	institutions: [],
	account_number: '',
	routing_number: '',
	bank_name: '',
	bank_nickname: '',
	bank_address: '',
	bank_location: ''	
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