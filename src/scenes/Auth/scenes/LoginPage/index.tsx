import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authApi } from '../../../../services/api/authApi';
import { userApi } from '../../../../services/api/userApi';
import { setUser } from '../../../../services/redux/slices/userSlice';
import LoginFormValues from '../../../../values/forms/LoginFormValues';
import UserModel from '../../../../values/models/UserModel';
import { SC } from './styles';

const LoginPage = ({ navigation }: any) => {

    const [status, setStatus] = useState<string | null>(null);


    const dispatch = useDispatch();

    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         // do something        
    //         dispatch(setTitle("Trang login"));
    //     });

    //     return unsubscribe;

    // }, [navigation])

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Test",
        })
    }, [])

    const submit = useCallback(async (values: LoginFormValues) => {
        try {
            setStatus("Đang xử lí đăng nhập");
            const response = await authApi.postLogin(values);
            try {
                await AsyncStorage.setItem('access_token', response.headers["x-access-token"]);
                await AsyncStorage.setItem("refresh_token", response.headers["x-refresh-token"]);

                //login successful

                try {
                    const response = await userApi.getCurrentUserInfo();
                    const user: UserModel = response.data;
                    dispatch(setUser(user));
                    if (user.cart) {
                        await AsyncStorage.setItem("cart", user.cart);
                    } else {
                        const cart = await AsyncStorage?.getItem("cart") ?? "{}";
                        await userApi.putCurrentUserCart(cart);
                    }
                    // store.dispatch(setWishList(JSON.parse(user?.wish_list ?? "[]")));
                } catch (err) {
                    AsyncStorage.removeItem("access_token");
                    AsyncStorage.removeItem("refresh_token");
                }

            } catch (err) {
                throw err;
            }
            // createCookie("access_token", response.headers["x-access-token"]);

            setStatus("Đăng nhập thành công");
            navigation.navigate("UserPage");
        } catch (err) {
            setStatus(err.response.data);
        }
    }, []);

    // const pressHandler = () => {
    //     navigation.navigate("Register");
    // }
    const initialValues: LoginFormValues = useMemo(
        () => ({
            username: "",
            password: "",
        }),
        []
    );


    return (
        <Formik initialValues={initialValues} onSubmit={submit}>
            {({ handleChange, handleSubmit, values }) => (
                <SC.Container>
                    <SC.Header>Login</SC.Header>

                    <SC.TextInput
                        onChangeText={handleChange('username')}
                        placeholder="Username..."
                        value={values.username}
                    />

                    <SC.TextInput
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        placeholder="Password..."
                        value={values.password}
                    />

                    <SC.Button onPress={handleSubmit} title="Đăng nhập" />

                    {status ? <SC.Status>{status}</SC.Status> : null}
                </SC.Container>
            )}
        </Formik>
    );
}

export default LoginPage;