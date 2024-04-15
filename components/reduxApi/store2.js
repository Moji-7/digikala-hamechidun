

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { api } from "./api";
import eyeProductsReducer from "./eyeProducts.reducer";

import itemsReducer from "./digikalaSelectedProducts.reducer";
import tokenSliceReducer from './tokenSlice.reducer';

import { apiPipeline } from "./pipelineApi";// Import your RTK Query API slice
import pipelineSliceReducer from './pipeline.reducer'; // Import your pipeline reducer
import notificationsSliceReducer from './notificationsSlice.reducer';

// Custom middleware for logging
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  return next(action);
};


export const store = configureStore({
  reducer: {
    api: api.reducer,
     digikalaSelectedProducts: itemsReducer,
    eye: eyeProductsReducer,
    token: tokenSliceReducer, // Add the token reducer
    pipeline: pipelineSliceReducer,
    notifications: notificationsSliceReducer, // Add the notifications reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loggerMiddleware,
      apiPipeline.middleware,
      api.middleware),
});

setupListeners(store.dispatch);