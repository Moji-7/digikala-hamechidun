import { useQuery } from "@tanstack/react-query";
import { SearchParamsOrderItem } from "../entity/SearchQueries";


// function objectToQueryString(obj) {
//     let pairs = [];
//     // Loop through the object properties
//     for (let key in obj) {
//         // Check if the property is own and enumerable
//         if (obj.hasOwnProperty(key) && typeof obj[key] !== "undefined") {
//             pairs.push(
//                 encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
//             );
//         }
//     }
//     return pairs.join("&");
// }


export const useCat = (params: SearchParamsOrderItem) => {
    // Use the useQuery hook to fetch the data from the API
    const { data, error, isLoading, isError } = useQuery({
        // Specify the query key as the item.title
        queryKey: ['catcat', params],
        // Specify the query function as an async arrow function that uses fetch to make the request
        queryFn: async () => {
            // Try to fetch the data from the API
            try {

                //const queryString = objectToQueryString(params);
                const searchParams = new URLSearchParams(params);
                const url = "http://localhost:3222/hamechidun/orderitem?" + searchParams;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                });

                // If the response is not OK, throw an error object with the status and message
                if (!response.ok) {
                    throw { status: response.status, message: response.statusText };
                }
                // Parse the response data as JSON and return it
                const data: any = await response.json();
                return data;
            } catch (error) {
                // If there is an error, throw it
                throw error;
            }
        },
        // Optionally, specify some query options, such as staleTime, refetchOnWindowFocus, etc.
        // For example, you can set the staleTime to 5 minutes, so that the data will not be refetched unless it is older than 5 minutes
        staleTime: 1000 * 60 * 5,
    });
    // Return an object with the data, error, isLoading, and isError properties from the query
    return { data, error, isLoading, isError };
}

