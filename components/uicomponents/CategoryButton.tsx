// Import React and other libraries
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";

import { CategorySearchParams, SearchParamsOrderItem, createSearchParamsOrderItem } from '../entity/SearchQueries';
import { CategoryGrouped, ICategoryChilds } from '../entity/OrdersProductsCategoriesInfo';



// Define the props for the custom component
interface CategoryButtonProps {
    categoryData: ICategoryChilds;
    key:string
}

// Define the custom component named CategoryButton
const CategoryButton: React.FC<CategoryButtonProps> = ({categoryData,key }) => {

    const navigation = useNavigation();

    // Define a generic type that represents the property name and value
    type UpdateParams = {
      prop: keyof SearchParamsOrderItem;
      value: SearchParamsOrderItem[keyof SearchParamsOrderItem];
    };
  
    const [searchParamsInstance, setSearchParamsInstance] = useState(
      createSearchParamsOrderItem({
        categoryType: categoryData.name,
        [categoryData.name]: categoryData.title,
        categorySearchParams : { item_category3: categoryData.title} as CategorySearchParams,
      })
    );
    const [buttonClicked, setButtonClicked] = useState(false);

    // useEffect(() => {
    //   // Check if the categoryData.name prop is not null or undefined
    //   if (categoryData.name != null) {
    //     setSearchParamsInstance((prevState) => ({
    //       ...prevState,
    //       [categoryData.name]: categoryData.title,
    //     }));
    //   }
    // }, [categoryData.name]);

    const handleClick = (event: React.MouseEvent, updateParams: UpdateParams) => {
      event.preventDefault(); 
      setSearchParamsInstance((prevState) => ({
        ...prevState,
        [updateParams.prop]: updateParams.value,
      }));
      setButtonClicked(true);
    };
    // when the searchParamsInstance state changes
    useEffect(() => {
      console.log(searchParamsInstance);
      //if(navigation.canGoBack())
      navigation.navigate('orderitem', searchParamsInstance);
     // return () => {};
    }, [searchParamsInstance]); // Pass the searchParamsInstance state as a dependency
  
  
  // Return the JSX element for the button
  return (
    <Button key={key}
              title={`🥵 ${categoryData.title} (${categoryData.count})`}
              onPress={(event) => handleClick(event, { prop: 'item_category3', value: categoryData.title })}
              />
  );
};

// Export the custom component
export default CategoryButton;
