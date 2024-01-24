import { useQuery } from "@tanstack/react-query";
import { CategorySearchParams } from "../entity/SearchQueries";
import { CategoryGrouped, CategoryGroupedLevels } from "../entity/OrdersProductsCategoriesInfo";

function usePopulateOrdersProductsCategoriesInfo(params: CategorySearchParams) {

  const { data, error, isLoading, isError } = useQuery({
    queryKey:  ["populateOrdersProductsCategoriesInfo", params],
    queryFn: async () => {
      try {
       // Use the parameters to construct the query string
       const searchParams = new URLSearchParams(params);
      // Fetch the data from the API with the query string
      const response = await fetch(
        `http://localhost:3222/hamechidun/populate_orders_products_categories_info?${searchParams}`
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
        } as Data ;
        return data;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  return { data, error, isLoading, isError ,getasCache};
}
////////////////////////////////////////////////////////////////////////////////////

const mapOrderGroupedCategory = (rawData: any, category: string): CategoryGrouped[] => {
  return rawData[category].map((item: any) => {
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
    } as CategoryGrouped;
  });
};

  //
  interface Data {
    orderGroupedCategory_2: CategoryGrouped[];
    orderGroupedCategory_3: CategoryGrouped[];
  }
  
  const getasCache = (categoryData: CategoryGrouped, data?: Data): CategoryGroupedLevels => {
    let parent: any = null;
  
    if (categoryData.name === "item_category3") {
      const filteredResults = data.orderGroupedCategory_3.filter(item => {
        return item.title === categoryData.title;
      });
      parent = filteredResults.length > 0 ? filteredResults[0].parent : null;
    }
  
    const filterOrderGroupedCategory_2 = data.orderGroupedCategory_2.filter(item => {
      return item.title === (parent ? parent.title : categoryData.title);
    });
    const filterOrderGroupedCategory_3 = data.orderGroupedCategory_3.filter(item => {
      return item.title === categoryData.title;
    });
  
    return {
      parent,
      filterOrderGroupedCategory_2,
      filterOrderGroupedCategory_3
    };
  };
  
export default usePopulateOrdersProductsCategoriesInfo;
