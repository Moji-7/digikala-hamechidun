
// create and use a context for the secretKey and tokenKey
import React, { createContext, useContext } from 'react';
import { secretKey, tokenKey } from '../config';

// create a context object
export const TokenContext = createContext();

// create a custom hook to provide the context value
export function useTokenProvider() {
  // define the context value as an object with the secretKey and tokenKey
  const value = {
    secretKey,
    tokenKey,
  };

  // return the value
  return value;
}