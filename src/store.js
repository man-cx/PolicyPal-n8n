import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import reducers here once created
// import authReducer from './features/auth/authSlice';
// import policiesReducer from './features/policies/policiesSlice';

// For now, create an empty reducer
const emptyReducer = (state = {}, action) => state;

const rootReducer = combineReducers({
  // Add reducers here as they are created
  // auth: authReducer,
  // policies: policiesReducer,
  app: emptyReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Whitelist the reducers you want to persist
  whitelist: ['app'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values for these actions
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store); 