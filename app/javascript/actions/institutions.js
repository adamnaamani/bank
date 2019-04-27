import axios from 'axios';
import { GET_INSTITUTIONS } from './types';

// GET INSTITUTIONS
export const getInstitutions = account => (dispatch, getState) => {
  axios.get('/api/v1/get_institutions', {
  	params: {
			account
  	}
  }).then(response => {
    dispatch({
      type: GET_INSTITUTIONS,
      payload: response.data.institutions
    })
  }).catch(error => console.log(error))
}
