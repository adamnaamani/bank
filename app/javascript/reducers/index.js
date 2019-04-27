import { combineReducers } from 'redux';
import auth from './auth';
import accounts from './accounts';
import institutions from './institutions'

export default combineReducers({
	auth,
  accounts,
  institutions
});