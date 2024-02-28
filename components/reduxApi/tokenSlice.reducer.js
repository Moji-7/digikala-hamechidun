
import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: '',
  },
  reducers: {
    setTokenRedux: (state, action) => {
      state.value = action.payload; 
    },
  },
});

export const { setTokenRedux } = tokenSlice.actions; 
export default tokenSlice.reducer; 