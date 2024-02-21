import { createSlice } from "@reduxjs/toolkit";
import { apiPipeline } from "./apiPipeline";

// const initialState = {
//   pipelineRunHistory: [],
// };

export const pipelineSlice = createSlice({
  name: 'apiPipeline',
  initialState: { loading: 'idle', error: null, data: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(apiPipeline.endpoints.getPipeline.matchPending, (state) => {
      state.loading = 'pending';
    });
    builder.addMatcher(apiPipeline.endpoints.getPipeline.matchFulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addMatcher(apiPipeline.endpoints.getPipeline.matchRejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
  },
});

export default pipelineSlice.reducer;
