import { createSlice } from "@reduxjs/toolkit";
import { apiIncredibles } from "./incrediblesApi";


const initialState = {
  incredibles: [],
  params: '', // Add params state
  isLoading: false, // Add loading state
  error: null, // Add error state
};

export const incrediblesSlice = createSlice({
  name: 'incredibles',
  initialState,//: { loading: 'idle', error: null, data: null },

  extraReducers: (builder) => {

    builder.addMatcher(apiIncredibles.endpoints.getAll.matchFulfilled, (state, action) => {
      //debugger;
      state.incredibles = action.payload;
    })

   },
});

export default incrediblesSlice.reducer;

