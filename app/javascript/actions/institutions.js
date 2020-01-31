import axios from 'axios';
import { GET_INSTITUTIONS } from './types';

export const getInstitutions = account => (dispatch) => {
  axios.get('/api/v1/institutions', { params: { account } })
  .then(({ data }) => {
    dispatch({ type: GET_INSTITUTIONS, payload: data })
  })
  .catch(error => console.log(error))
}
