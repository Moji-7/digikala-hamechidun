import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Linking, FlatList, GestureResponderEvent, ScrollView } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button, Tab } from '@rneui/themed';
import { useEyeProduct } from '../hooks/useEyeOnProduct';
import { EyeProduct, EyeProductParams } from '../entity/Eye.dto';
import { useQueryClient } from '@tanstack/react-query';


import { Alert } from 'react-native';
import ProductSearch from '../product/ProductSearch';
import DigikalaProductSelected from './DigikalaProductSelected';
import DigikalaSelectedProductSubmitButton from './DigikalaSelectedProductSubmitButton';
import SimpleComponent from './SimpleComponent';
import { NavigationContainer } from '@react-navigation/native';



interface Props {
    eyeProductParam: EyeProductParams;
}

const EyeProductAddComponent: React.FC<Props> = ({ eyeProductParam }) => {
    const { theme } = useTheme();
    const queryClient = useQueryClient();

    const { data, error, isLoading, isError, deleteMutation, addMutation } = useEyeProduct(eyeProductParam, queryClient);

    const initialFormData = {
        userId: 1,
        productId: 123,
        productTitle: "",
        info: "",
        pipelinesIds: "1,2,3"
    };

    const [formData, setFormData] = useState<typeof initialFormData>(initialFormData);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string } | null>();


    const validateField = (key: string, value: string) => {
        if (value.length < 3) {
            return `${key} must be at least 3 characters long`;
        }
        return undefined; // No error
    };
    const handleInputChange = (field: string, text: string) => {
        setFormData({ ...formData, [field]: text });
        const error = validateField(field, text);
        setValidationErrors({ ...validationErrors, [field]: error });
    };


    const handleAdd = async (event) => {
        const allErrors = Object.entries(formData)
            .map(([field, value]) => validateField(field, value))
            .filter(Boolean); // Filter out undefined errors
        console.log(allErrors)
        if (allErrors.length > 0) {
            setValidationErrors(
                Object.fromEntries(allErrors.map(([field, message]) => ([field, message])))
            );
            return;
        }
        try {
            const result = await addMutation.mutateAsync(formData);
            setFormData(initialFormData);
            Alert.alert("Success", "The eye product was added successfully", [
                { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
            //   <AlertComponenti message="Eye product added successfully" type="success" />
            console.log('The eye product was added successfully', result);

        } catch (error) {
            Alert.alert("Error", "The eye product could not be added", [
                { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
        }
    };
    // Check for initial validation of empty fields
    const initialErrors = Object.entries(formData)
        .map(([field, value]) => validateField(field, value))
        .filter(Boolean);
    useEffect(() => {
        setValidationErrors(
            Object.fromEntries(initialErrors.map(([field, message]) => ([field, message])))
        );

    }, []);
    // useEffect(() => {
    //     console.log(Object.keys(validationErrors || {}).length > 0)
    // }, validationErrors);

    const inputData = [
        // ... your input labels and keys
        { key: "productTitle", label: "Product Title" },
        { key: "info", label: "Info" },
        // ... add more input objects
    ];
    const renderInput = ({ item: { key, label } }: { item: { key: string; label: string } }) => (
        <View key={key}>
            <Text>{label}</Text>
            <TextInput
                placeholder={label}
                onChangeText={(text) => handleInputChange(key, text)}
                value={formData[key]}
                error={!!validationErrors?.[key]}
                helperText={validationErrors?.[key]}
            />

        </View>
    );
    return (
        <View>
            {/* <FlatList
                data={inputData}
                renderItem={renderInput}
                keyExtractor={(item) => item.key}
            />
            <Button onPress={(e) => handleAdd(e)} key={'addEyeBtn'} title='Add'
                disabled={Object.keys(validationErrors || {}).length > 0}

            /> */}
            <>
                {/* <ScrollView style={styles.container}>
                 
                </ScrollView> */}

                {/* <NavigationContainer>
                    <Tab.Naviator>
                        <Tab.Screen name="Search" component={ProductSearch} />
                        <Tab.Screen name="Selected" component={DigikalaProductSelected} />
                    </Tab.Naviator>
                </NavigationContainer> */}

                <DigikalaProductSelected />
                <DigikalaSelectedProductSubmitButton />
                <ProductSearch />

            </>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default EyeProductAddComponent;
