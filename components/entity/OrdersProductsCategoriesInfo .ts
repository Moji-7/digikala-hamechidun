export interface CategoryGrouped {
    name: string;
    title: string;
    parent: string;
    count: string;
    maxPrice: string;
    avgPrice: number;
    totalPrice: number;
    avgDiscount: string;
    childs: ICategoryTitles;
  }
  export interface ICategoryTitles {
    name: string;
    title: string;
    parent: string;
    count: number;
    total_price: number;
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
