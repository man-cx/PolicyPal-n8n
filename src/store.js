import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

// Import slices here - for example:
// import userReducer from './slices/userSlice';
// import policyReducer from './slices/policySlice';

// Combine all reducers
const rootReducer = combineReducers({
  // Add reducers here as they're created
  // user: userReducer,
  // policies: policyReducer,
});

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Whitelist (save specific reducers)
  whitelist: [
    // 'user',
    // 'policies',
  ],
  // Blacklist (don't save specific reducers)
  blacklist: [],
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

export default { store, persistor }; 