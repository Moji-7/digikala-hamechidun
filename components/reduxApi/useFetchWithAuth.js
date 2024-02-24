
import useTokenStorage from "../../auth/components/hooks/useTokenStorage";
// define a custom hook that returns a function to fetch data with authorization
export const useFetchWithAuth = () => {
  // get the token from the custom hook
  const { getToken } = useTokenStorage();

  // define a function that can make the API call with the token
  const fetchData = async (url, options) => {
    // get the token value
    const token = await getToken();

    // set the authorization header
    let headers = {};
    if (token) {
      headers = { authorization: `Bearer ${token}` };
    }

    // make the fetch request with the headers and options
    const response = await fetch(url, { ...options, headers });
    const data = await response.json();

    // return the data
    return data;
  };

  // return the fetchData function
  return fetchData;
};