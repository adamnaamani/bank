import { combineReducers } from 'redux';
import auth from './auth';
import accounts from './accounts';
import institutions from './institutions'
import geo from './geo'

export default combineReducers({
	auth,
  accounts,
  institutions,
  geo
});