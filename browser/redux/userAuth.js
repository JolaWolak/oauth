import axios from 'axios';

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

export const loginUser = (user) => dispatch => {
  axios.post('/login',user)
       .then(res => (console.log('We authenticated user : ',res)))
       .catch(error => console.error('Not able to login the user ', error));
}

export const signUp = (user) => dispatch => {
  axios.post('/signup',user)
    .then(res => (console.log('User created: ', res)))
    .catch(error => console.error('User could not be created', error))
}



