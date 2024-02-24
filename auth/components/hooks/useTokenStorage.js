
// useTokenStorage.js
// modify the custom hook to use the context value
  import CryptoJS from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTokenConsumer } from './useTokenConsumer';

// define a custom hook for storing and retrieving tokens
export default function useTokenStorage() {
  // get the secretKey and tokenKey from the context using the custom hook
  const { secretKey, tokenKey } = useTokenConsumer();

  // define a function for storing the token
  const storeData = async (value) => {
    try {
      // convert the value to a string
      const stringValue = JSON.stringify(value);
      // encrypt the value with the secret key
      const encryptedValue = CryptoJS.AES.encrypt(stringValue, secretKey).toString();
      // store the encrypted value with the token key
      await AsyncStorage.setItem(tokenKey, encryptedValue);
    } catch (e) {
      // handle the error
      console.error(e);
    }
  };

  // define a function for retrieving the token
  const getData = async () => {
    try {
      // get the encrypted value with the token key
      const encryptedValue = await AsyncStorage.getItem(tokenKey);
      // decrypt the value with the secret key
      const decryptedValue = CryptoJS.AES.decrypt(encryptedValue, secretKey).toString(CryptoJS.enc.Utf8);
      // parse the value to an object
      const value = JSON.parse(decryptedValue);
      // return the value
      return value;
    } catch (e) {
      // handle the error
      console.error(e);
    }
  };

  // return the storeData and getData functions as an object
  return {
    setToken: storeData,
    getToken: getData,

  };
}