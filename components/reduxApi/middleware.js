import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const authMiddleware = (store) => (next) => (action) => {
  if (action.type.startsWith('api1/') || action.type.startsWith('api2/')) {
    if (action.type.endsWith('/pending') && action.meta.method === 'POST') {
      action.meta.headers = {
        ...action.meta.headers,
        Authorization: `Bearer ${store.getState().auth.token}`, // Assuming token is in auth state
      };
    }
  }

  return next(action);
};