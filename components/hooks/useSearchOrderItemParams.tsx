import { useEffect, useState } from "react";
import { SearchParamsOrderItem, createSearchParamsOrderItem } from "../entity/SearchQueries";

function useSearchOrderItemParams() {

    // Define a generic type that represents the property name and value
    type UpdateParams = {
        prop: keyof SearchParamsOrderItem;
        value: SearchParamsOrderItem[keyof SearchParamsOrderItem];
    };

    //Move the searchParamsInstance state and the handleClick function to the parent component
    const [searchOrderItemParams, setSearchOrderItemParams] = useState(
        createSearchParamsOrderItem({
            categoryType: "",
            //  categorySearchParams: {} as CategorySearchParams,
        })
    );
    useEffect(() => {
        console.log(searchOrderItemParams);
    }, [searchOrderItemParams]); 
    return { searchOrderItemParams, setSearchOrderItemParams }
}
export default useSearchOrderItemParams;