import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const initialState = {
  eyeProducts: [],
};

const eyeProductsSlice = createSlice({
  name: "eye",
  initialState,
  reducers: {
    addSaveProduct: (state, action) => {
      state.saveProducts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getEye.matchFulfilled, (state, action) => {
        //debugger;
        state.eyeProducts = action.payload;
      })
      .addMatcher(api.endpoints.SubmitEyeProducts.matchFulfilled, (state, action) => {
        state.eyeProducts = [...state.eyeProducts, ...action.payload];
      })
      .addMatcher(api.endpoints.deleteItem.matchFulfilled, (state, action) => {
        if (action.payload.success) {
          //debugger;
          const deletedProductId = action.meta.arg.originalArgs;
          state.eyeProducts = state.eyeProducts.filter(
            (product) => product.id !== deletedProductId
          );

          
        } else {
          // Handle deletion failure, e.g., display an error message
          console.error("Deletion failed:", action.error);
        }
      });
  },
});

export const { addSaveProduct} = eyeProductsSlice.actions;

export default eyeProductsSlice.reducer;
