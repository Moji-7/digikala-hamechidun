// Parent component
interface OrdersProductsCategoriesProps {
    categoriesValue: CategorySearchParams;
  }
  
  const OrdersProductsCategoriesInfo: React.FC<OrdersProductsCategoriesProps> = ({
    categoriesValue,
  }) => {
    // Use the useTheme hook to get the theme object from RNEUI
    const { theme } = useTheme();
  
    const { data, error, isLoading, isError } = usePopulateOrdersProductsCategoriesInfo(
      categoriesValue
    );
  
    
    return (
      <View style={styles.container}>
        {isLoading && (
          <Text style={[styles.loading, { color: theme.colors.primary }]}>
            Loading...
          </Text>
        )}
        {isError && (
          <Text style={[styles.error, { color: theme.colors.error }]}>
            Error: {error.message}
          </Text>
        )}
        {data && (
          <>
            {data.orderGroupedCategory_2.map((item, index) => (
              <ListItem.Subtitle
                style={{ borderWidth: 1, borderColor: "black" }}
              >
                {/* Pass the searchParamsInstance and handleClick as props to the child component */}
                <ListCategoryGrouped
                  categoryData={item}
                  index={index}
                  key={index}
                  searchParamsInstance={searchParamsInstance}
                  handleClick={handleClick}
                />
              </ListItem.Subtitle>
            ))}
          </>
        )}
      </View>
    );
  };
  
  // Child component
  interface ListItemComponentProps {
    categoryData: any;
    index: number;
    // Add the searchParamsInstance and handleClick as props
    searchParamsInstance: SearchParamsOrderItem;
    handleClick: (
      event: React.MouseEvent,
      updateParams: {
        prop: keyof SearchParamsOrderItem;
        value: SearchParamsOrderItem[keyof SearchParamsOrderItem];
      }
    ) => void;
  }
  
  const ListCategoryGrouped: React.FC<ListItemComponentProps> = ({
    categoryData,
    index,
    // Destructure the searchParamsInstance and handleClick from props
    searchParamsInstance,
    handleClick,
  }) => {
    // Remove the navigation, UpdateParams, searchParamsInstance, handleClick, and useEffect from the child component
  
    return (
      // Use the searchParamsInstance and handleClick from props
      <View>
        <Text>{categoryData.name}</Text>
        <Text>{categoryData.title}</Text>
        <Button
          onPress={(event) =>
            handleClick(event, {
              prop: "categoryType",
              value: categoryData.name,
            })
          }
        >
          Set category type
        </Button>
        <Button
          onPress={(event) =>
            handleClick(event, {
              prop: categoryData.name,
              value: categoryData.title,
            })
          }
        >
          Set category value
        </Button>
        <Button
          onPress={(event) =>
            handleClick(event, {
              prop: "categorySearchParams",
              value: { item_category2: categoryData.title } as CategorySearchParams,
            })
          }
        >
          Set category search params
        </Button>
      </View>
    );
  };