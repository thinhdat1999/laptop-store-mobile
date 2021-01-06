import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authApi } from '../../../../services/api/authApi';
import { userApi } from '../../../../services/api/userApi';
import { setUser } from '../../../../services/redux/slices/userSlice';
import { setWishList } from '../../../../services/redux/slices/wishListSlice';
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

    const EXPIRE_IN_MINUTES = 15;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Đăng nhập",
            // headerTitleStyle: {color: "white"},
            // headerLeftStyle: {color: "white"},
            // headerStyle: {backgroundColor: "grey",}
        })
    }, [])

    const getExpireDate = () => {
        const now = new Date();
        let expireTime = new Date(now);
        expireTime.setMinutes(now.getMinutes() + EXPIRE_IN_MINUTES);
        return expireTime;
    }

    const submit = useCallback(async (values: LoginFormValues) => {
        try {
            setStatus("Đang xử lí đăng nhập");
            const response = await authApi.postLogin(values);
            try {
                let access_token = JSON.stringify({
                    "access_token": response.headers["x-access-token"],
                    "expire_at": getExpireDate(),
                });

                await AsyncStorage.setItem('access_token', access_token);
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
                    dispatch(setWishList(JSON.parse(user?.wish_list ?? "[]")));
                } catch (err) {
                    AsyncStorage.removeItem("access_token");
                    AsyncStorage.removeItem("refresh_token");
                }

            } catch (err) {
                throw err;
            }
            // createCookie("access_token", response.headers["x-access-token"]);

            setStatus("Đăng nhập thành công");
            navigation.goBack();
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
                    <SC.Header>Welcome!</SC.Header>
                    <SC.SubText>Đăng nhập bằng tài khoản bạn đã đăng kí trước đó.</SC.SubText>

                    <SC.InputTitle>Tài khoản</SC.InputTitle>
                    <SC.TextInput
                        onChangeText={handleChange('username')}
                        placeholder="Tên đăng nhập..."
                        value={values.username}
                    />

                    <SC.InputTitle>Mật khẩu</SC.InputTitle>
                    <SC.TextInput
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        placeholder="Mật khẩu..."
                        value={values.password}
                    />

                    <SC.Button onPress={handleSubmit}><SC.ButtonTitle>Đăng nhập</SC.ButtonTitle></SC.Button>

                    {status ? <SC.Status>{status}</SC.Status> : null}
                    <SC.SignUpContainer>
                        <SC.SignUpText>Chưa có tài khoản? </SC.SignUpText>
                        <SC.Link onPress={() => {navigation.navigate("Register")}}><SC.LinkTitle>Đăng kí ngay.</SC.LinkTitle></SC.Link>
                    </SC.SignUpContainer>

                </SC.Container>
            )}
        </Formik>
    );
}

export default LoginPage;