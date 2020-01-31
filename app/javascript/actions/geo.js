import { GET_COORDINATES } from './types'

export const getCoordinates = (account, address) => (dispatch) => {
  let geocoder = new google.maps.Geocoder();

  return new Promise((resolve) => {
	  geocoder.geocode({componentRestrictions: {country: 'US'}, address: address}, function(results, status) {
	    if(status == 'OK') {
	      resolve(dispatch({ type: GET_COORDINATES, payload: {...results[0], account: account} }));
	    } else {
	    	dispatch({ type: GET_COORDINATES, payload: status });
	    }
	  })
  });  
}
