
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { SearchParamsOrderItem, SearchProductQuery } from "../entity/SearchQueries";


export const useDigikalaSearchProduct = (params: SearchProductQuery, queryClient: QueryClient) => {

    // Use the useQuery hook to fetch the data from the API
    const { data, error, isLoading, isError } = useQuery({
        // Specify the query key as the item.title
        queryKey: ['useSearchProduct', params],
        // Specify the query function as an async arrow function that uses fetch to make the request
        queryFn: async () => {
            // Try to fetch the data from the API
            try {

                //const queryString = objectToQueryString(params);
                const searchParams = new URLSearchParams(params);
                const url = "http://localhost:3222/digikala/searchProduct?" + searchParams;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                });
                if (!response.ok) {
                    throw { status: response.status, message: response.statusText };
                }
                const data: any = await response.json();
                return data;
            } catch (error) {
                throw error;
            }
        },
        staleTime: 1000 * 60 * 5,
    });

    return { data, error, isLoading, isError};
}
