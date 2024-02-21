import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { api } from "./api";
import itemsReducer from "./digikalaSelectedProducts.reducer";
import eyeProductsReducer from "./eyeProducts.reducer";

import { apiPipeline } from "./apiPipeline";
//import pipelineReducer from "./pipeline.reducer";



export const store = configureStore({
    reducer: {
        // Add the created reducers here: 
        api1: api.reducer,
        digikalaSelectedProducts: itemsReducer,

        eyeProducts: eyeProductsReducer,

        api2: apiPipeline.reducer,
       // apiPipeline: pipelineReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware, apiPipeline.middleware),
});

setupListeners(store.dispatch);