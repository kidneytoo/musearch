import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('api/current_user');
  console.log('fetch');
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const fetchUserLogin = data => async dispatch => {
  console.log(data);
  dispatch({
    type: FETCH_USER,
    payload: data
  });
};
