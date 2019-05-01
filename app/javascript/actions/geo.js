import axios from 'axios';
import { GET_COORDINATES } from './types'

export const getCoordinates = (account, address) => (dispatch, getState) => {
  let request = { origin: address, destination: address, travelMode: google.maps.DirectionsTravelMode.DRIVING };
  let geocoder = new google.maps.Geocoder();

  return new Promise((resolve, reject) => {
	  geocoder.geocode({componentRestrictions: {country: 'US'}, address: address}, function(results, status) {
	    if(status == 'OK') {
	      dispatch({ type: GET_COORDINATES, payload: {...results[0], account: account} });
	    } else {
	    	dispatch({ type: GET_COORDINATES, payload: status });
	    }
	  })
    resolve()
  });  
}
