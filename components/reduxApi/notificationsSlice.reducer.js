import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      // Add the new notification to the start of the array
      state.unshift(action.payload);
    },
  },
});

export const { addNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
