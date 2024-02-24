import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import { useNavigation } from '@react-navigation/native';

import { useTheme } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTokenStorage from './hooks/useTokenStorage';
import { useDispatch, useSelector } from 'react-redux';
import { setTokenRedux } from '../../components/reduxApi/tokenSlice.reducer';


// define the validation schema
const validationSchema = yup.object().shape({
    email: yup
        .string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter a registered email'),
    password: yup
        .string()
        .label('Password')
        .required()
        .min(4, 'Password must have at least 4 characters '),
});


const LoginScreen = () => {
    const { theme } = useTheme();
    const { navigate, reset } = useNavigation(); // Get the navigation props
    const initialValues = {
        email: 'abc@gmail.com',
        password: 'secret',
    };
    // store item
    const { setToken, getToken } = useTokenStorage()


    const dispatch = useDispatch();
    // define a secret key and a token key for the custom hook

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
                // TODO: send the values to your backend and get the bearer token
                // TODO: store the bearer token in local storage using AsyncStorage
                // TODO: navigate to the next screen using React Navigation

                //await storeData('authorization Bearer mojijun')
                const token = 'authorization Bearer mojijun3';

                // store the token using the setToken function
                await setToken(token);
                dispatch(setTokenRedux(token));
                // Navigate to the first route in the drawer navigator
                navigate("Incredibles");
                // Reset the navigation state
                reset([{ name: 'Incredibles' }]);
                // store the bearer token in local storage using AsyncStorage


            }}
            // pass the validation schema to the Formik component
            validationSchema={validationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <Text style={styles.title}>Email</Text>
                    <TextInput style={styles.input}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                    {errors.email && touched.email && <Text>{errors.email}</Text>}
                    <Text style={styles.title}>Password</Text>
                    <TextInput style={styles.input}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry
                    />
                    {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}
                    <Button onPress={handleSubmit} title="Login" />
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        borderRadius: 5,
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
});

export default LoginScreen;
