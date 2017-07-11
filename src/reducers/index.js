import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
const rootReducer = combineReducers({
  // es6 syntax helper, state will be produced by redux form reducer
  // auth reducer produces auth piece of our state
  form,
  auth: authReducer
});

export default rootReducer;
