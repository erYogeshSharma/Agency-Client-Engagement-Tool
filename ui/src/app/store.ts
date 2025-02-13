import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import authReducer from '../features/auth/auth.slice';
import { api } from './services/auth.service';

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'tokens'], // Only persist the auth slice
};

// Combine reducers
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: persistReducer(persistConfig, authReducer),
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid issues with non-serializable data in Redux Persist
    }).concat(api.middleware),
});

// Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
