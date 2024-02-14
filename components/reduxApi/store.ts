import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";

import itemsReducer from "./eyeProductsSelected.reducer";

// Create the store
export const store = configureStore({
  reducer: {
    digikalaProducts: itemsReducer,
    api: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),
});

