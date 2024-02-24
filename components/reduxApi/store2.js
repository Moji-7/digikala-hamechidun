

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { api } from "./api";
import itemsReducer from "./digikalaSelectedProducts.reducer";
import eyeProductsReducer from "./eyeProducts.reducer";

import { apiPipeline } from "./apiPipeline";
import tokenSliceReducer from './tokenSlice.reducer';


export const store = configureStore({
    reducer: {
       
        api1: api.reducer,
        digikalaSelectedProducts: itemsReducer,

        eyeProducts: eyeProductsReducer,

        api2: apiPipeline.reducer,
        token: tokenSliceReducer, // Add the token reducer
  
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat( api.middleware, apiPipeline.middleware),
});

setupListeners(store.dispatch);