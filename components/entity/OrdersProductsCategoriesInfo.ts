export interface CategoryGrouped {
    name: string;
    title: string;
    parent: string;
    count: string;
    maxPrice: string;
    avgPrice: number;
    totalPrice: number;
    avgDiscount: string;
    childs: ICategoryChilds[];
  }
  export interface ICategoryChilds {
    name: string;
    title: string;
    parent: string;
    count: number;
    total_price: number;
  }

  export interface CategoryGroupedLevels {
    parent: string;
    filterOrderGroupedCategory_2: CategoryGrouped[];
    filterOrderGroupedCategory_3: CategoryGrouped[];
  }
  
    // // Define the properties for the orders grouping object
    // ordersGrouping: {
    //     [key: string]: {
    //         count: number;
    //         maxPrice: number;
    //         avgPrice: number;
    //         totalPrice: number;
    //         avgDiscount: number;
    //     };
    // };
}
