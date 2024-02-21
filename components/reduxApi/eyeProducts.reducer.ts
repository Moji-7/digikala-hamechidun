import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const initialState = {
  eyeProducts: [],
};

const eyeProductsSlice = createSlice({
  name: "eyeProducts",
  initialState,
  reducers: {
    addSaveProduct: (state, action) => {
      state.saveProducts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.submitItems.matchFulfilled,
      (state, action) => {
        state.eyeProducts =  [...state.eyeProducts, ...action.payload];
      }
    ) .addMatcher(
        api.endpoints.deleteItem.matchFulfilled,
        (state, action) => {
            debugger;
            if (action.payload.success) {
                const deletedProductId = action.meta.arg.originalArgs; // Assuming you pass the productId as an argument to the mutation
                // Remove the deleted product from the state using filtering
                state.eyeProducts = state.eyeProducts.filter(
                  (product) => product.id !== deletedProductId
                );
              } else {
                // Handle deletion failure, e.g., display an error message
                console.error('Deletion failed:', action.error);
              }
            }
      );
  },
});

export const { addSaveProduct } = eyeProductsSlice.actions;

export default eyeProductsSlice.reducer;
