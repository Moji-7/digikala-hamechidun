import { useQuery } from "@tanstack/react-query";

function usePopulateOrdersProductsCategoriesInfo() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["populateOrdersProductsCategoriesInfo"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "http://localhost:3222/hamechidun/populate_orders_products_categories_info"
        );

        if (!response.ok) {
          throw { status: response.status, message: response.statusText };
        }
        const rawData = await response.json();
        const orderGroupedCategory2 = mapOrderGroupedCategory(rawData, 'orderGroupedCategory_2');
        const orderGroupedCategory3 = mapOrderGroupedCategory(rawData, 'orderGroupedCategory_3');
        
        // Map the received JSON data to match the entity model
        const data = {
          orderGroupedCategory_2:orderGroupedCategory2,
          orderGroupedCategory_3: orderGroupedCategory3
        };
        return data;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  return { data, error, isLoading, isError };
}
const mapOrderGroupedCategory = (rawData, category) => {
    return rawData[category].map((item) => {
      //const title = category === 'orderGroupedCategory_3' ? item.item_category2.title : item.category.title;
      return {
        name: item.category.name,
        title: item.category.title,
        parent: item.category.parent,
        count: item.category.count,
        maxPrice: item.category.max_price,
        avgPrice: item.category.avg_price,
        totalPrice: item.category.total_price,
        avgDiscount: item.category.avg_discount,
        childs: item.category.childs
      };
    });
  };
  
export default usePopulateOrdersProductsCategoriesInfo;
