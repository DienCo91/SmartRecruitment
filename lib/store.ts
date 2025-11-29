import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import authReducer from './features/auth/authSlice';
import commonReducer from './features/common/commonSlice';
import favoriteJobsReducer from './features/favorites/favotiteSlice';
import filterReducer from './features/filters/filterSlice';
import chatReducer from './features/chat/chatSlice';
import notificationReducer from './features/notification/notificationSlice';

import storage from './storage';

const rootReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
  favoriteJobs: favoriteJobsReducer,
  chat: chatReducer,
  filter: filterReducer,
  notification: notificationReducer,
});

//default is whitelist
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['common', 'filter'], // Add slices you don't want to persist here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });
  return store;
};

export const store = makeStore();

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
