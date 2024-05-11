

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { api } from "./api";
import eyeProductsReducer from "./eyeProducts.reducer";

import itemsReducer from "./digikalaSelectedProducts.reducer";
import tokenSliceReducer from './tokenSlice.reducer';

import { apiPipeline } from "./pipelineApi";// Import your RTK Query API slice
import pipelineSliceReducer from './pipeline.reducer'; // Import your pipeline reducer

import notificationsSliceReducer from './notificationsSlice.reducer';

import { apiIncredibles } from './incrediblesApi';// Import your RTK Query API slice
import incrediblesSliceReducer from './incrediblesSlice.reducer';// Import your reducer



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
    token: tokenSliceReducer, 
    pipeline: pipelineSliceReducer,
    notifications: notificationsSliceReducer, 
    incredibles: incrediblesSliceReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loggerMiddleware,
      apiPipeline.middleware,
      apiIncredibles.middleware,
      api.middleware),
});

setupListeners(store.dispatch);