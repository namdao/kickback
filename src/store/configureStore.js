// Redux Store Configuration
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import appStateMiddleware from './middleware/appState';
import loggingMiddleware from './middleware/logging';
import sagaMiddleware from './middleware/saga'
const configureStore = () => {
  let middleware;
  if (process.env.NODE_ENV !== 'production') {
    middleware = applyMiddleware(loggingMiddleware, sagaMiddleware, appStateMiddleware);
  } else {
    middleware = applyMiddleware(sagaMiddleware, appStateMiddleware);
  }
  return createStore(rootReducer, middleware);
};

export default configureStore;
