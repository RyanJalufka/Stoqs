import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from "redux-devtools-extension"
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import rootReducer from './Reducers/index'
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store)