import { GET_USER } from "../actions/types";

const initialState = {
	loaded: false,
	authenticated: false,
	user: {}
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_USER:
      return {
      	...state,
      	authenticated: true, 
      	user: action.payload
      }  	
    default:
      return state;
  }
}