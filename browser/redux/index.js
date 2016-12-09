import { combineReducers } from 'redux';
import users from './users';
import stories from './stories';
import currentUser from './userAuth';

export default combineReducers({ users, stories, currentUser });