import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

const config = {
 key: 'root',
 storage: AsyncStorage,
 whitelist: ['likedJobs']
};

const reducer = persistCombineReducers(config, reducers);

export default function configurationStore(initialState = {}) {
	const store = createStore(
	  reducer,
	  initialState,
	  applyMiddleware(thunk, logger),
	);

	const persistor = persistStore(store);
	persistor.flush();

	return { persistor, store };
}