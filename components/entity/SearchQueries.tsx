export interface SearchParamsOrderItem {
  // Define the properties and their types
  categoryType?: string;
   item_category2?: string;
   item_category3?: string;
  categorySearchParams?:CategorySearchParams;
  allOrderItems?: boolean;
  product_title_fa?: string;
  quantity?: number;
  seller_title?: string;
  sortColumn: string;
  sortType: string;
  selling_price?:number
}

// Define the type for the query params without the null values
type QueryParamsWithoutNull = Omit<
SearchParamsOrderItem,
  'item_category2' | 'item_category3'
>;

// Define a function that takes an optional parameter object and returns an object with default values
export function createSearchParamsOrderItem(
  options?: Partial<SearchParamsOrderItem>
): SearchParamsOrderItem {
  // Define the default values
  const defaults: SearchParamsOrderItem = {
    sortColumn: 'quantity',
    sortType: 'DESC',
  };
  // Merge the default values with the user-provided values and return the result
  return { ...defaults, ...options };
}

export interface CategorySearchParams {
  item_category2?: string;
  item_category3?: string;
}

export interface SearchParamsProductPrice {
  // Define the properties and their types
  product_id?: number;
}
