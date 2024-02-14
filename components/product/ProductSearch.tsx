import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Linking, FlatList, GestureResponderEvent } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button, Icon, } from '@rneui/themed';
import { useDigikalaSearchProduct } from '../hooks/useDigikalaSearchProduct';
import { useQueryClient } from '@tanstack/react-query';
import { SearchProductQuery } from '../entity/SearchQueries';
import DigikalaProductSelected from '../forms/DigikalaProductSelected';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../reduxApi/eyeProductsSelected.reducer';
import EyeProductAddButton from '../forms/EyeProductAddButton';



// interface Props {
//     eyeProductParam: EyeProductParams;
// }

const ProductSearch: React.FC = ({ }) => {
    const { theme } = useTheme();

    const queryClient = useQueryClient();
    const [searchProductResults, setsearchProductResults] = useState<any[]>([]);
    const [searchProductQuery, setSearchProductQuery] = useState<SearchProductQuery>({ inputValue: 'هات', page: 1 });
    const { data, error, isLoading, isError } = useDigikalaSearchProduct(searchProductQuery, queryClient);




    const debounce = (fn, time) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                timeoutId = null;
                fn(...args);
            }, time);
        };
    };
    const searchMedicineOnChange = debounce((value) => {
        if (value.length > 3) {
            console.log('search');
            setSearchProductQuery({ inputValue: value, page: 1 })
            //setsearchProductResults({ ...searchProductQuery, searchProductQuery});
        }
    }, 1000);

    const handleInputChange = (e) => {
        searchMedicineOnChange(e);
    };
    const handleNextPage = (e) => {
        setSearchProductQuery({ ...searchProductQuery, page: searchProductQuery.page + 1 });
    }


    return (
        <>
        {/* digikalaSelectedProduct.length > 0 && */}
            <View>
                { <DigikalaProductSelected />}
            </View>
            <View>

                <TextInput
                    value={searchProductQuery.inputValue}
                    onChangeText={(e) => handleInputChange(e)}
                    placeholder="Enter your search query..."
                />

                {isLoading && <Text>Loading...</Text>}
                {error && <Text>Error: {error}</Text>}


                {isLoading && <Text >Loading...</Text>}
                {/* Show an error message if the fetch failed */}
                {isError && <Text >Error: {error.message}</Text>}
                {/* Show the data if the fetch succeeded */}

                {data &&
                    (<>
                        <Button title={`(${searchProductQuery.page}) next page`} onPress={(e) => handleNextPage(e)} />
                        <Card>
                            <Card.Title> 🤑🐾</Card.Title>
                            <FlatList
                                data={data.products}
                                renderItem={({ item }) => (
                                    <Card key={item.id}>
                                        {/* <Card.Image source={{ uri: item.imageUrl }} /> */}
                                        <Card.Title>{item.title_fa}</Card.Title>
                                        <Text>Price: {item.default_variant.seller.title}</Text>
                                        {/* <Text>Rating: {item.rating}</Text> */}

                                        {/* Add more details as needed */}
                                        <EyeProductAddButton digikalaProduct={item} />
                                    </Card>
                                )}
                            />
                            
                        </Card>
                    </>
                    )

                }
            </View>
        </>
    )
};


export default ProductSearch;
