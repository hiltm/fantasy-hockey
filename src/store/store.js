import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

const composedEnhancer = compose(rootReducer, applyMiddleware(thunk));

const store = createStore(composedEnhancer, composeWithDevTools());

export default store;