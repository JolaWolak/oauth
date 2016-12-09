import axios from 'axios';
import {browserHistory} from 'react-router';

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER'



/* ------------   ACTION CREATORS     ------------------ */

const setUser  = user => ({ type: SET_CURRENT_USER, user })



/* ------------       REDUCER     ------------------ */

export default function reducer (user = {}, action) {
  switch (action.type) {
    
    case SET_CURRENT_USER: 
      return action.user

    default: 
      return user;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchCurrentUser = () => dispatch => {
  axios.get('/auth/me')
    .then(res => dispatch(setUser(res.data)))
    .catch(err => console.error('Fetching current user unsuccessful. ', error));
}

export const loginUser = (user) => dispatch => {
  axios.post('/login',user)
       .then(res => (dispatch(setUser(user))))
       .catch(error => console.error('Not able to login the user ', error));
  browserHistory.push('/');
}

export const signUp = (user) => dispatch => {
  axios.post('/signup',user)
    .then(res => (dispatch(setUser(user))))
    .catch(error => console.error('User could not be created', error));
  browserHistory.push('/');
}

export const logout = () => dispatch => {
  axios.post('/logout')
      .then(res => dispatch(setUser({})))
      .catch(error => console.error('Logout unsuccessful ', error)); 
    browserHistory.push('/');
}



