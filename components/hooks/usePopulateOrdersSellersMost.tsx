


import { useQuery } from '@tanstack/react-query';

function usePopulateOrdersSellersMost() {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['populateOrdersSellersMost'], // The query key
        queryFn: async () => { // The query function with the async keyword
            try {
                const response = await fetch("http://localhost:3222/hamechidun/populate_orders_sellers_most");
                if (!response.ok) {
                    throw { status: response.status, message: response.statusText };
                }
                const data = await response.json();
                return data;
            } catch (error) {
                // Throw the error object
                throw error;
            }
        },
        // Optionally, use the enabled option to control when to fetch the data
        // enabled: queryKey !== null && queryKey !== undefined,
        // Optionally, use the staleTime option to specify how long the data will be considered fresh
        // staleTime: 1000 * 60 * 5, // 5 minutes
    });
    return { data, error, isLoading, isError };
}
export default usePopulateOrdersSellersMost;
