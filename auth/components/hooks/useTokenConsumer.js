import { useContext } from "react";
import { TokenContext } from "../../TokenContext";

// create a custom hook to consume the context value
export function useTokenConsumer() {
    // get the context value using the useContext hook
    const value = useContext(TokenContext);
    // return the value
    return value;
  }