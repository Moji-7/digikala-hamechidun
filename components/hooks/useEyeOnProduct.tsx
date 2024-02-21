import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { SearchParamsOrderItem } from "../entity/SearchQueries";
;
import { EyeProduct, EyeProductParams } from "../entity/Eye.dto";

export const useEyeProduct = (params?: EyeProductParams , queryClient: QueryClient) => {

    // Use the useQuery hook to fetch the data from the API
    const { data, error, isLoading, isError } = useQuery({
        // Specify the query key as the item.title
        queryKey: ['useEyeProduct', params],
        // Specify the query function as an async arrow function that uses fetch to make the request
        queryFn: async () => {
            // Try to fetch the data from the API
            try {

                //const queryString = objectToQueryString(params);
                const searchParams = new URLSearchParams(params);
                const url = "http://localhost:3222/eye/?page=1&length=10" + searchParams;
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
    const deleteMutation = useMutation({
        mutationFn: async (productId: number) => {
          const response = await fetch(`http://localhost:3222/eye/${productId}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw { status: response.status, message: response.statusText };
          }
          return response.json();
        },
        // onSettled: () => {
        //     // Invalidate the query keys that depend on the eye product data
        //     queryClient.invalidateQueries("useEyeProduct");
        //   },
      });
       const addMutation = useMutation({
        mutationFn: async (eyeProduct: EyeProduct) => {
          const response = await fetch(`http://localhost:3222/eye/EyeProduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(eyeProduct),
          });
          if (!response.ok) {
            throw { status: response.status, message: response.statusText };
          }
          return response.json();
        },
        onSettled: () => {
            // Invalidate the query keys that depend on the eye product data
            queryClient.invalidateQueries("useEyeProduct");
          },
      });
      
    
      return { data, error, isLoading, isError,  deleteMutation,addMutation };
}

