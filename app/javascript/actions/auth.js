import axios from 'axios';
import { GET_USER } from "../actions/types";

export const getUser = () => (dispatch, getState) => {
  axios.get('/api/v1/users', getState)
    .then(({ data }) => {
      dispatch({ type: GET_USER, payload: data })
    })
    .catch(error => console.log(error))
}
