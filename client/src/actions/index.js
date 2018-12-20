import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get(`http://localhost:3000/api/current_user`);
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const fetchUserLogin = data => async dispatch => {
  dispatch({
    type: FETCH_USER,
    payload: data
  });
};
