import { createSlice } from "@reduxjs/toolkit";
import { apiPipeline } from "./pipelineApi";

const initialState = {
  details: [],
  pipelineStatusAll:[],
  pipelineStatusSummery: {},
  isLoading: false, // Add loading state
  error: null, // Add error state
};

export const pipelineSlice = createSlice({
  name: 'pipeline',
  initialState,//: { loading: 'idle', error: null, data: null },
  reducers: {},
  extraReducers: (builder) => {

    builder.addMatcher(apiPipeline.endpoints.getAll.matchFulfilled, (state, action) => {
      //debugger;
      state.details = action.payload.pipelines;
    })
    .addMatcher(apiPipeline.endpoints.getPipelineStatusAll.matchFulfilled, (state, action) => {
      state.pipelineStatusAll = action.payload;
    })
    .addMatcher(apiPipeline.endpoints.getPipelineStatusSummery.matchFulfilled, (state, action) => {
      //debugger;
      const eyeProductId:number = action.meta.arg.originalArgs; // Assuming the eyeProductId is available here
      state.pipelineStatusSummery[(eyeProductId)] = action.payload;
    })

   },
});

export default pipelineSlice.reducer;

