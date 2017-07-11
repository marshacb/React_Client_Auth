import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  // es6 syntax helper, state will be produced by redux form reducer
  form
});

export default rootReducer;
