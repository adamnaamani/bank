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
      	institutions: action.payload,
				account_number: action.payload.account_number,
				routing_number: action.payload.routing_number,
				bank_name: action.payload.bank_name,
				bank_nickname: action.payload.bank_nickname,
				bank_address: action.payload.bank_address,
				bank_location: action.payload.bank_location      	
      }  	
    default:
      return state;
  }
}