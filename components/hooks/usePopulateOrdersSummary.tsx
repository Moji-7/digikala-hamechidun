import { useQuery } from '@tanstack/react-query';

function usePopulateOrdersSummary() {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['populateOrdersSummary'], // The query key
        queryFn: async () => { 
            try {
                const response = await fetch("http://localhost:3222/hamechidun/populate_orders_summary");
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
export default usePopulateOrdersSummary;
