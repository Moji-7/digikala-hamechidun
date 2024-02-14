import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  digikalaProducts: [],
};

// Create the slice
const digikalaProductsSlice = createSlice({
  name: "digikalaProducts",
  initialState,
  reducers: {
    // Define a reducer to add an item to the state
    addItem: (state, action) => {
      
      state.digikalaProducts?.find(product => product.id === action.payload.id) || state.digikalaProducts.push(action.payload);

    },
    // Define a reducer to remove an item from the state
    removeItem: (state, action) => {
      state.digikalaProducts = state.digikalaProducts.filter((item) => item.id !== action.payload);
    },
  },
});

// Export the actions and the reducer
export const { addItem, removeItem } = digikalaProductsSlice.actions;
export default digikalaProductsSlice.reducer;
