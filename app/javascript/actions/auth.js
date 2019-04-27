import axios from 'axios';
import { GET_USER } from "../actions/types";

//GET USER
export const getUser = () => (dispatch, getState) => {
  axios.get('/api/v1/get_user', getState).then(response => {
    dispatch({
      type: GET_USER,
      payload: response.data.user
    })
  }).catch(error => console.log(error))
}
