import { useQuery } from "@tanstack/react-query";

import { SearchParamsProductPrice } from "../../entity/SearchQueries";

export const useProductPrice = (params:SearchParamsProductPrice ) => {
    // Use the useQuery hook to fetch the data from the API
    const { data, error, isLoading, isError } = useQuery({
        // Specify the query key as the item.title
        queryKey: ['useProductPrice', params],
        // Specify the query function as an async arrow function that uses fetch to make the request
        queryFn: async () => {
            try {

                const searchParamsProductPrice = params as SearchParamsProductPrice;
           
                const url = "http://localhost:3222/products/" + `${searchParamsProductPrice.product_id}`;
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
        staleTime: 1000 * 60 * 5,
    });
    // Return an object with the data, error, isLoading, and isError properties from the query
    return { data, error, isLoading, isError };
}

