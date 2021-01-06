import AsyncStorage from "@react-native-community/async-storage";
import { Picker } from "@react-native-picker/picker";
import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { authApi } from "../../../../services/api/authApi";
import { userApi } from "../../../../services/api/userApi";
import tokenHelper from "../../../../services/helper/tokenHelper";
import { setUser } from "../../../../services/redux/slices/userSlice";
import { setWishList } from "../../../../services/redux/slices/wishListSlice";
import store from "../../../../services/redux/store";
import RegisterFormValues from "../../../../values/forms/RegisterFormValues";
import UserModel from "../../../../values/models/UserModel";
import { SC } from "./styles";

type FormInputState = {
    defaultValues: RegisterFormValues;
    validations: {
        isValidName: string | null,
        isValidEmail: string | null,
        isValidPhone: string | null,
        isValidGender: string | null,
        isValidUsername: string | null,
        isValidPassword: string | null,
        isValidConfirm: string | null,
    };
    isChecked: boolean;
    submitting: boolean;
    status: string;
}


const RegisterPage = ({ navigation, route }: any) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Đăng ký",
        })
    }, [])

    const initialInput: FormInputState = {
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            gender: "MALE",
            username: "",
            password: "",
            confirm: "",
        },
        validations: {
            isValidName: "Họ tên không được để trống",
            isValidEmail: "Email không được để trống",
            isValidPhone: "Điện thoại không được để trống",
            isValidGender: null,
            isValidUsername: "Tên tài khoản không được để trống",
            isValidPassword: "Mật khẩu không được để trống",
            isValidConfirm: "Mật khẩu xác nhận không được để trống",
        },
        isChecked: false,
        submitting: false,
        status: "",
    }

    const [state, setState] = React.useState<FormInputState>(initialInput);
    const { defaultValues, validations, isChecked, submitting, status } = state;


    const getExpireDate = () => {
        const now = new Date();
        let expireTime = new Date(now);
        expireTime.setMinutes(now.getMinutes() + 15);
        return expireTime;
    }

    const loadData = async () => {
        const token = await tokenHelper.getToken();
        if (token !== null) {
            try {
                const response = await userApi.getCurrentUserInfo();
                const user: UserModel = response.data;
                store.dispatch(setUser(user));

                if (user.cart) {
                    await AsyncStorage.setItem("cart", user.cart);
                } else {
                    const cart = await AsyncStorage?.getItem("cart") ?? "{}";
                    await userApi.putCurrentUserCart(cart);
                }
                store.dispatch(setWishList(JSON.parse(user?.wish_list ?? "[]")));
            } catch (err) {
                AsyncStorage.removeItem("access_token");
                AsyncStorage.removeItem("refresh_token");
                throw err;
            }
        }
    }


    const submit = async (values: RegisterFormValues) => {
        try {
            setState((prev) => ({
                ...prev,
                status: "Đang xử lí đăng kí..."
            }));
            const registerResponse = await authApi.postRegister(values);
            const loginResponse = await authApi.postLogin({
                username: values.username,
                password: values.password,
            });
            try {
                let access_token = JSON.stringify({
                    "access_token": loginResponse.headers["x-access-token"],
                    "expire_at": getExpireDate(),
                });

                await AsyncStorage.setItem('access_token', access_token);
                await AsyncStorage.setItem("refresh_token", loginResponse.headers["x-refresh-token"]);

                //login successful
            } catch (err) {
                throw err;
            }

            setState((prev) => ({
                ...prev,
                status: registerResponse.data,
            }));
            await loadData();
            navigation.reset({
                index: 0,
                key: null,
                routes: [
                    {
                        key: null,
                        name: 'Home'
                    },
                ],
            })
        } catch (err) {
            setState((prev) => ({
                ...prev,
                status: err.response.data,
            }));
        }
    }

    const submitForm = () => {
        // validate data.
        if (!(validations.isValidName ||
            validations.isValidEmail ||
            validations.isValidPhone ||
            validations.isValidGender ||
            validations.isValidUsername ||
            validations.isValidPassword ||
            validations.isValidConfirm)) {
            //submit
            submit(defaultValues);
        } else {
            setState((prev) => ({
                ...prev,
                isChecked: true,
                submitting: false,
            }));
        }
    }

    return (
        <SC.Container>
            <SC.Form showsVerticalScrollIndicator={false}>
                <SC.InputContainer>
                    <SC.InputTitle>Họ tên</SC.InputTitle>
                    <SC.InputField
                        defaultValue={defaultValues.name}
                        onChangeText={(value: string) => {
                            if (value.length === 0) {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        name: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidName: "Họ tên không được để trống",
                                    }
                                }));
                            }
                            else if (value.length >= 30) {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        name: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidName: "Họ tên tối đa 30 kí tự",
                                    }
                                }));
                            } else {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        name: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidName: null,
                                    }
                                }));
                            }
                        }} />
                    {validations.isValidName && isChecked ?
                        <SC.ValidationContainer>
                            <SC.ValidationText>{validations.isValidName}</SC.ValidationText>
                        </SC.ValidationContainer> : null
                    }
                </SC.InputContainer>

                <SC.InputContainer>
                    <SC.InputTitle>Email</SC.InputTitle>
                    <SC.InputField
                        defaultValue={defaultValues.email}
                        onChangeText={(value: string) => {
                            if (value.length === 0) {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        email: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidEmail: "Email không được để trống",
                                    }
                                }));
                            } else if (value.length >= 50) {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        email: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidEmail: "Email tối đa 50 kí tự",
                                    }
                                }));
                            } else if (!value.match(/(.+)@(.+){2,}\.(.+){2,}/)) {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        email: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidEmail: "Email không hợp lệ",
                                    }
                                }));
                            }
                            else {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        email: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidEmail: null,
                                    }
                                }));
                            }
                        }} />
                    {validations.isValidEmail && isChecked ?
                        <SC.ValidationContainer>
                            <SC.ValidationText>{validations.isValidEmail}</SC.ValidationText>
                        </SC.ValidationContainer> : null
                    }
                </SC.InputContainer>

                <SC.InputContainer>
                    <SC.InputTitle>Số điện thoại</SC.InputTitle>
                    <SC.InputField
                        keyboardType="numeric"
                        defaultValue={defaultValues.phone}
                        onChangeText={(value: string) => {
                            if (value.length === 0) {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        phone: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidPhone: "Số điện thoại không được để trống",
                                    }
                                }));
                            }
                            else if (!value.match(/^[0-9]{10}$/)) {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        phone: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidPhone: "Số điện thoại gồm 10 chữ số",
                                    }
                                }));
                            } else {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        phone: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidPhone: null,
                                    }
                                }));
                            }
                        }} />
                    {validations.isValidPhone && isChecked ?
                        <SC.ValidationContainer>
                            <SC.ValidationText>{validations.isValidPhone}</SC.ValidationText>
                        </SC.ValidationContainer> : null
                    }
                </SC.InputContainer>

                <SC.InputContainer>
                    <SC.InputTitle>Giới tính</SC.InputTitle>
                    <SC.PickerContainer>
                        <Picker
                            selectedValue={defaultValues.gender}
                            onValueChange={(itemValue, itemIndex) => {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        gender: itemValue.toString(),
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidGender: null,
                                    }
                                }));
                            }}
                            style={
                                {
                                    borderBottomWidth: 1,
                                    borderBottomColor: "blue",
                                }
                            }

                        >
                            <Picker.Item label="Nam" value="MALE" />
                            <Picker.Item label="Nữ" value="FEMALE" />
                            <Picker.Item label="Khác" value="OTHER" />
                        </Picker>
                    </SC.PickerContainer>

                    {validations.isValidGender && isChecked ?
                        <SC.ValidationContainer>
                            <SC.ValidationText>{validations.isValidGender}</SC.ValidationText>
                        </SC.ValidationContainer> : null
                    }
                </SC.InputContainer>
                <SC.InputContainer>
                    <SC.InputTitle>Tên tài khoản</SC.InputTitle>
                    <SC.InputField
                        defaultValue={defaultValues.username}
                        onChangeText={(value: string) => {
                            if (value.length < 6) {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        username: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidUsername: "Tên tài khoản tối thiểu 6 kí tự",
                                    }
                                }));
                            }
                            else if (value.length >= 30) {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        username: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidUsername: "Tên tài khoản tối đa 30 kí tự",
                                    }
                                }));
                            } else if (!value.match(/^(?!.*[_.]{2})[^_.].*[^_.]$/)) {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        username: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidUsername: "Tên tải khoản không hợp lệ",
                                    }
                                }));
                            }
                            else {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        username: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidUsername: null,
                                    }
                                }));
                            }
                        }} />
                    {validations.isValidUsername && isChecked ?
                        <SC.ValidationContainer>
                            <SC.ValidationText>{validations.isValidUsername}</SC.ValidationText>
                        </SC.ValidationContainer> : null
                    }
                </SC.InputContainer>
                <SC.InputContainer>
                    <SC.InputTitle>Mật khẩu</SC.InputTitle>
                    <SC.InputField
                        secureTextEntry={true}
                        defaultValue={defaultValues.password}
                        onChangeText={(value: string) => {
                            if (value.length < 12) {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        password: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidPassword: "Mật khẩu tối thiểu 12 kí tự",
                                    }
                                }));
                            }
                            else if (value.length >= 80) {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        password: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidPassword: "Mật khẩu tối đa 80 kí tự",
                                    }
                                }));
                            } else {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        password: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidPassword: null,
                                    }
                                }));
                            }
                        }} />
                    {validations.isValidPassword && isChecked ?
                        <SC.ValidationContainer>
                            <SC.ValidationText>{validations.isValidPassword}</SC.ValidationText>
                        </SC.ValidationContainer> : null
                    }
                </SC.InputContainer>
                <SC.InputContainer>
                    <SC.InputTitle>Xác nhận mật khẩu</SC.InputTitle>
                    <SC.InputField
                        secureTextEntry={true}
                        defaultValue={defaultValues.confirm}
                        onChangeText={(value: string) => {
                            if (value !== defaultValues.password) {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        confirm: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidConfirm: "Mật khẩu nhập lại không trùng khớp",
                                    }
                                }));
                            }
                            else if (value.length === 0) {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        confirm: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidConfirm: "Mật khẩu nhập lại không được để trống",
                                    }
                                }));
                            } else {
                                setState((prev) => ({
                                    ...prev,
                                    defaultValues: {
                                        ...prev.defaultValues,
                                        confirm: value,
                                    },
                                    validations: {
                                        ...prev.validations,
                                        isValidConfirm: null,
                                    }
                                }));
                            }
                        }} />
                    {validations.isValidConfirm && isChecked ?
                        <SC.ValidationContainer>
                            <SC.ValidationText>{validations.isValidConfirm}</SC.ValidationText>
                        </SC.ValidationContainer> : null
                    }
                </SC.InputContainer>
                {status ? <SC.Status>{status}</SC.Status> : null}
                <SC.Button disabled={submitting} onPress={submitForm}>
                    <SC.ButtonTitle>Đăng ký</SC.ButtonTitle>
                </SC.Button>
            </SC.Form>
        </SC.Container>
    );
}

export default RegisterPage;