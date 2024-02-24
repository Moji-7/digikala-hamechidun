
import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: '', // Store the token value initially as an empty string
  },
  reducers: {
    setTokenRedux: (state, action) => {
      state.value = action.payload; // Update the token value in the state
    },
  },
});

export const { setTokenRedux } = tokenSlice.actions; // Export the action creator
export default tokenSlice.reducer; // Export the reducer