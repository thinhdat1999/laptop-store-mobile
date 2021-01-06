import { Picker } from '@react-native-picker/picker';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { userApi } from '../../../../services/api/userApi';
import { RootState } from '../../../../services/redux/rootReducer';
import { setUser } from '../../../../services/redux/slices/userSlice';
import store from '../../../../services/redux/store';
import UserInfoFormValues from '../../../../values/forms/UserInfoFormValues';
import UserModel from '../../../../values/models/UserModel';
import { SC } from './styles';


type InfoPageState = {
    user: UserModel;

};
type FormInputState = {
    defaultValues: UserInfoFormValues;
    validations: {
        isValidName: string | null,
        isValidEmail: string | null,
        isValidPhone: string | null,
        isValidGender: string | null
    };
    isChecked: boolean;
    submitting: boolean;
}

const InfoPage = ({ navigation }: any) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Thông tin người dùng",
            // headerTitleStyle: {textAlign: 'center'},
        })
    }, [])

    // @ts-ignore
    const { user }: InfoPageState = useSelector((state: RootState) => {
        const user = state.user;
        return {
            user: user,
        };
    });

    const initialInput: FormInputState = {
        defaultValues: {
            name: user?.name,
            phone: user?.phone,
            email: user?.email,
            gender: user?.gender,
        },
        validations: {
            isValidName: null,
            isValidEmail: null,
            isValidPhone: null,
            isValidGender: null,
        },
        isChecked: false,
        submitting: false,
    }

    const [state, setState] = React.useState<FormInputState>(initialInput);

    const { defaultValues, validations, isChecked, submitting } = state;

    const { name, phone, email, gender } = defaultValues;

    const submit = useCallback(async (data: UserInfoFormValues) => {
        setState((prev) => ({
            ...prev,
            submitting: true,
        }));
        try {
            const response = await userApi.putCurrentUserInfo(data);
            const newUser = { ...user, ...data };
            store.dispatch(setUser(newUser));
            alert(response.data);
        } catch (err) {
            alert("Fail");
            throw err;
        }
        setState((prev) => ({
            ...prev,
            submitting: false,
        }));
    }, []);

    const submitForm = () => {
        // validate data.
        if (!(validations.isValidName ||
            validations.isValidEmail ||
            validations.isValidPhone ||
            validations.isValidGender)) {
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
                            selectedValue={gender}
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
            </SC.Form>
            <SC.ActionBar>
                <SC.Button disabled={submitting} onPress={submitForm}>
                    <SC.ButtonTitle>Lưu thay đổi</SC.ButtonTitle>
                </SC.Button>
            </SC.ActionBar>

        </SC.Container>
    );
}

export default InfoPage;