import { TokenContext, useTokenProvider } from "../TokenContext";

// create a component to wrap the context provider
export function TokenProvider({ children }) {
    // get the context value using the custom hook
    const value = useTokenProvider();
  
    // render the context provider with the value and the children
    return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
  }