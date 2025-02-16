import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

import { api } from '@/app/services/auth.service'; // ✅ Ensured correct import path
import { projectAPI } from '@/app/services/project.service'; // ✅ Ensured correct import path
import authReducer from '../features/auth/auth.slice';
import projectReducer from '../features/auth/project.slice'; // ✅ Fixed incorrect path

// Persist config for auth & project slices
const persistAuthConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'tokens'], // ✅ Persist only necessary fields
};

const persistProjectConfig = {
  key: 'project',
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: persistReducer(persistAuthConfig, authReducer),
  project: persistReducer(persistProjectConfig, projectReducer),
  [api.reducerPath]: api.reducer,
  [projectAPI.reducerPath]: projectAPI.reducer,
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Prevent issues with non-serializable data
    }).concat(api.middleware, projectAPI.middleware), // ✅ Fixed array syntax
});

// Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
