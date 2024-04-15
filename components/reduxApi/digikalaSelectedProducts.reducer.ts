import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSubmitEyeProductsMutation } from "./api";
import { api} from './api';
// Define the initial state
const initialState = {
  digikalaSelectedProducts: [],
};

// Create the slice
const digikalaSelectedProductsSlice = createSlice({
  name: "digikalaSelectedProducts",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.digikalaSelectedProducts?.find(product => product.id === action.payload.id) || state.digikalaSelectedProducts.push(action.payload);
    },
    removeItem: (state, action) => {
      state.digikalaSelectedProducts = state.digikalaSelectedProducts.filter((item) => item.id !== action.payload);
    },
    removeAllItem: (state, action) => {
      state.digikalaSelectedProducts = [];
    },


    submitItems: (state, action) => {
      const [submitItems] = useSubmitEyeProductsMutation();
      submitItems(state.digikalaSelectedProducts);
      
    },
    
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.SubmitEyeProducts.matchFulfilled,
      (state, action) => {
        state.digikalaSelectedProducts = [];
      }
    );
  },

});

export const { addItem, removeItem,removeAllItem  } = digikalaSelectedProductsSlice.actions;
export default digikalaSelectedProductsSlice.reducer;
