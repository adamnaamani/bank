import { GET_COORDINATES } from "../actions/types";

const initialState = {
	loaded: false,
	coordinates: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_COORDINATES:
      return {
      	...state,
      	loaded: true,
      	coordinates: [...state.coordinates, action.payload]
      }  
    default:
      return state;
  }
}
