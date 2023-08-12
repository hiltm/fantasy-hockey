import { combineReducers } from 'redux';
import NHLDataReducer from './AllData/allData.reducer';

const rootReducer = combineReducers({
  NHLDataReducer: NHLDataReducer,
});

export default rootReducer;