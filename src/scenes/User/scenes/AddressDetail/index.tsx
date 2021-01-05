import CheckBox from "@react-native-community/checkbox";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { useSelector } from "react-redux";
import addressApi from "../../../../services/api/addressApi";
import locationApi from "../../../../services/api/locationApi";
import { userApi } from "../../../../services/api/userApi";
import { RootState } from "../../../../services/redux/rootReducer";
import { fireFetching, skipFetching } from "../../../../services/redux/slices/loaderStatusSlice";
import { setMessage } from "../../../../services/redux/slices/messageSlice";
import { setDefaultAddressId } from "../../../../services/redux/slices/userSlice";
import store from "../../../../services/redux/store";
import AddressFormValues from "../../../../values/forms/AddressFormValues";
import LocationModel from "../../../../values/models/LocationModel";
import AddressModal from "./components/AddressModal";
import { SC } from "./styles";

type AddressDetailState = {
    cities: LocationModel[];
    districts: LocationModel[];
    wards: LocationModel[];
    defaultValues: {
        receiver_name: string,
        receiver_phone: string,
        city_id: number | null,
        district_id: number | null,
        ward_id: number | null,
        street: string
        address_num: string,
    },
    citiesModalVisible: boolean,
    districtModalVisible: boolean,
    wardModalVisible: boolean,
    validations: {
        isValidName: string | null,
        isValidPhone: string | null,
        isValidCity: string | null,
        isValidDistrict: string | null,
        isValidWard: string | null,
        isValidStreet: string | null,
        isValidAddressNum: string | null,
    },
    isChecked: boolean,
    loading: boolean,
    submitting: boolean,
    isDefaultAddress: boolean,
};

const AddressDetail = ({ navigation, route }: any) => {
    // @ts-ignore
    const { addressId } = route.params;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: addressId ? "Chi tiết địa chỉ" : "Thêm địa chỉ",
        })
    }, [])

    const showAddressButton: boolean = useSelector(
        (state: RootState) => addressId && state.user?.address_id !== parseInt(addressId)
    );

    const initialState: AddressDetailState = useMemo(
        () => ({
            cities: [],
            districts: [],
            wards: [],
            defaultValues: {
                receiver_name: "",
                receiver_phone: "",
                city_id: null,
                district_id: null,
                ward_id: null,
                street: "",
                address_num: "",
            },
            citiesModalVisible: false,
            districtModalVisible: false,
            wardModalVisible: false,
            validations: {
                isValidName: "Tên người nhận không được để trống",
                isValidPhone: "Số điện thoại không được để trống",
                isValidCity: "Tỉnh/Thành không được để trống",
                isValidDistrict: "Quận/Huyện không được để trống",
                isValidWard: "Phường/Xã không được để trống",
                isValidStreet: "Tên đường không được để trống",
                isValidAddressNum: "Số nhà không được để trống",
            },
            isChecked: false,
            loading: true,
            submitting: false,
            isDefaultAddress: !showAddressButton,
        }),
        []
    );

    const [state, setState] = useState<AddressDetailState>(initialState);
    const { cities, districts, wards, defaultValues, citiesModalVisible, districtModalVisible, wardModalVisible, isChecked, validations, submitting, loading, isDefaultAddress } = state;

    useEffect(() => {
        const loadData = async () => {
            const response = await locationApi.getCities();
            const cities = response.data;

            if (addressId) {
                const response = await addressApi.getAddressById(addressId);
                const values = response.data;
                const [districts, wards] = (
                    await Promise.all([
                        locationApi.getDistrictsByCityId(values.city_id),
                        locationApi.getWardsByDistrictId(values.district_id),
                    ])
                ).map((response) => response.data);

                setState((prev) => ({
                    ...prev,
                    cities: cities,
                    districts: districts,
                    wards: wards,
                    defaultValues: {
                        ...prev.defaultValues,
                        receiver_name: values.receiver_name,
                        receiver_phone: values.receiver_phone,
                        city_id: values.city_id,
                        district_id: values.district_id,
                        ward_id: values.ward_id,
                        street: values.street,
                        address_num: values.address_num,
                    },
                    validations: {
                        ...prev.validations,
                        isValidName: null,
                        isValidPhone: null,
                        isValidCity: null,
                        isValidDistrict: null,
                        isValidWard: null,
                        isValidStreet: null,
                        isValidAddressNum: null,
                    },
                    loading: false,
                }));
            } else {
                setState((prev) => ({ ...prev, cities: cities, loading: false }));
            }
        };

        loadData();
    }, []);

    const selectCity = useCallback(async (cityId: number) => {
        setState((prev) => ({
            ...prev, districts: [], wards: [], citiesModalVisible: false, defaultValues: {
                ...prev.defaultValues,
                city_id: cityId,
            },
            validations: {
                ...prev.validations,
                isValidCity: null,
            },
            loading: true,
        }));
        const response = await locationApi.getDistrictsByCityId(cityId);
        const districts = response.data;
        setState((prev) => ({ ...prev, districts: districts, districtModalVisible: true, loading: false }));
    }, []);

    const selectDistrict = useCallback(async (districtId: number) => {
        setState((prev) => ({
            ...prev, wards: [], districtModalVisible: false, defaultValues: {
                ...prev.defaultValues,
                district_id: districtId,
            },
            validations: {
                ...prev.validations,
                isValidDistrict: null,
            },
            loading: true,
        }));
        const response = await locationApi.getWardsByDistrictId(districtId);
        const wards = response.data;
        setState((prev) => ({ ...prev, wards: wards, wardModalVisible: true, loading: false }));
    }, []);

    const selectWard = useCallback((wardId: number) => {
        setState((prev) => ({
            ...prev, wardModalVisible: false, defaultValues: {
                ...prev.defaultValues,
                ward_id: wardId,
            },
            validations: {
                ...prev.validations,
                isValidWard: null,
            }
        }));
    }, []);

    const submit = useCallback(async (values: AddressFormValues) => {
        let message: string | null = null;
        setState((prev) => ({
            ...prev,
            submitting: true,
            loading: true,
        }));
        try {
            if (addressId) {
                await addressApi.putAddress(addressId, values);
                message = "Cập nhật địa chi thành công";
            } else {
                const response = await addressApi.postAddress(values);
                navigation.goBack();
                //  = `/user/addresses/edit/${response.data}`;
            }
        } catch (err) {
            message = err.response;
        } finally {
            if (message) {
                store.dispatch(setMessage(message));
            }
            setState((prev) => ({
                ...prev,
                submitting: false,
                loading: false,
            }));
        }

    }, [isDefaultAddress]);

    const setDefaultAddress = useCallback(async (addressId) => {
        let message: string | null = null;
        try {
            const id = parseInt(addressId);
            const response = await userApi.putDefaultAddress(id);
            store.dispatch(setDefaultAddressId(id));
            message = response.data;
        } catch (err) {
            message = err.response;
        } finally {
            if (message) {
                store.dispatch(setMessage(message));
            }
        }
    }, []);

    useEffect(() => {
        if (cities.length === 0) {
            store.dispatch(fireFetching());
        } else {
            store.dispatch(skipFetching());
        }
    }, [cities]);

    const submitForm = () => {
        // validate data.
        if (!(validations.isValidAddressNum || validations.isValidName || validations.isValidPhone ||
            validations.isValidCity || validations.isValidDistrict || validations.isValidWard || validations.isValidStreet)) {
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

    const openCitiesModal = () => {
        if (loading) return;
        setState((prev) => ({
            ...prev,
            citiesModalVisible: true,
        }));

    }

    const closeCitiesModal = () => {
        setState((prev) => ({
            ...prev,
            citiesModalVisible: false,
        }));
    }

    const openDistrictModal = () => {
        if (loading) return;
        setState((prev) => ({
            ...prev,
            districtModalVisible: true,
        }));

    }

    const closeDistrictModal = () => {
        setState((prev) => ({
            ...prev,
            districtModalVisible: false,
        }));
    }

    const openWardModal = () => {
        if (loading) return;
        setState((prev) => ({
            ...prev,
            wardModalVisible: true,
        }));

    }

    const closeWardModal = () => {
        setState((prev) => ({
            ...prev,
            wardModalVisible: false,
        }));
    }

    // const handleCheckBox = (value: boolean) => {
    //     console.log(value);
    //     setState((prev) => ({
    //         ...prev,
    //         isDefaultAddress: value,
    //     }))
    // }

    return (
        cities.length === 0 ? <ActivityIndicator size="large" color="black" /> :
            <SC.Container>
                <SC.Form showsVerticalScrollIndicator={false}>
                    <SC.InputContainer>
                        <SC.InputTitle>Họ tên</SC.InputTitle>
                        <SC.InputField
                            defaultValue={defaultValues.receiver_name}
                            onChangeText={(value: string) => {
                                if (value.length >= 30) {
                                    setState((prev) => ({
                                        ...prev,
                                        defaultValues: {
                                            ...prev.defaultValues,
                                            receiver_name: value,
                                        },
                                        validations: {
                                            ...prev.validations,
                                            isValidName: "Tên người nhận tối đa 30 kí tự",
                                        }
                                    }));
                                } else {
                                    setState((prev) => ({
                                        ...prev,
                                        defaultValues: {
                                            ...prev.defaultValues,
                                            receiver_name: value,
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
                        <SC.InputTitle>Số điện thoại</SC.InputTitle>
                        <SC.InputField
                            defaultValue={defaultValues.receiver_phone}
                            keyboardType="numeric"
                            onChangeText={(value: string) => {
                                if (!value.match(/^[0-9]{10}$/)) {
                                    setState((prev) => ({
                                        ...prev,
                                        defaultValues: {
                                            ...prev.defaultValues,
                                            receiver_phone: value,
                                        },
                                        validations: {
                                            ...prev.validations,
                                            isValidPhone: "Số điện thoại phải gồm 10 chữ số",
                                        }
                                    }));
                                } else {
                                    setState((prev) => ({
                                        ...prev,
                                        defaultValues: {
                                            ...prev.defaultValues,
                                            receiver_phone: value,
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
                        <SC.InputTitle>Tỉnh/Thành</SC.InputTitle>
                        <SC.SelectField onPress={openCitiesModal}>
                            <SC.SelectView>
                                <SC.SelectInput>{defaultValues.city_id ? cities.filter(i => i.id === defaultValues.city_id)[0]?.name : ""}</SC.SelectInput>
                                <Icon name="caret-down" size={20} color="#777" />
                            </SC.SelectView>
                        </SC.SelectField>
                        {validations.isValidCity && isChecked ?
                            <SC.ValidationContainer>
                                <SC.ValidationText>{validations.isValidCity}</SC.ValidationText>
                            </SC.ValidationContainer> : null
                        }
                    </SC.InputContainer>
                    <SC.InputContainer>
                        <SC.InputTitle>Quận/Huyện</SC.InputTitle>
                        <SC.SelectField onPress={openDistrictModal}>
                            <SC.SelectView>
                                <SC.SelectInput>{defaultValues.district_id ? districts.filter(i => i.id === defaultValues.district_id)[0]?.name : ""}</SC.SelectInput>
                                <Icon name="caret-down" size={20} color="#777" />
                            </SC.SelectView>
                        </SC.SelectField>
                        {validations.isValidDistrict && isChecked ?
                            <SC.ValidationContainer>
                                <SC.ValidationText>{validations.isValidDistrict}</SC.ValidationText>
                            </SC.ValidationContainer> : null
                        }
                    </SC.InputContainer>
                    <SC.InputContainer>
                        <SC.InputTitle>Phường/Xã</SC.InputTitle>
                        <SC.SelectField onPress={openWardModal}>
                            <SC.SelectView>
                                <SC.SelectInput>{defaultValues.ward_id ? wards.filter(i => i.id === defaultValues.ward_id)[0]?.name : ""}</SC.SelectInput>
                                <Icon name="caret-down" size={20} color="#777" />
                            </SC.SelectView>
                        </SC.SelectField>
                        {validations.isValidWard && isChecked ?
                            <SC.ValidationContainer>
                                <SC.ValidationText>{validations.isValidWard}</SC.ValidationText>
                            </SC.ValidationContainer> : null
                        }
                    </SC.InputContainer>
                    <SC.InputContainer>
                        <SC.InputTitle>Đường</SC.InputTitle>
                        <SC.InputField
                            defaultValue={defaultValues.street}
                            onChangeText={(value: string) => {
                                if (value.length >= 30) {
                                    setState((prev) => ({
                                        ...prev,
                                        defaultValues: {
                                            ...prev.defaultValues,
                                            street: value,
                                        },
                                        validations: {
                                            ...prev.validations,
                                            isValidStreet: "Tên đường tối đa 30 kí tự",
                                        }
                                    }));
                                } else {
                                    setState((prev) => ({
                                        ...prev,
                                        defaultValues: {
                                            ...prev.defaultValues,
                                            street: value,
                                        },
                                        validations: {
                                            ...prev.validations,
                                            isValidStreet: null,
                                        }
                                    }));
                                }
                            }}
                        />
                        {validations.isValidStreet && isChecked ?
                            <SC.ValidationContainer>
                                <SC.ValidationText>{validations.isValidStreet}</SC.ValidationText>
                            </SC.ValidationContainer> : null
                        }
                    </SC.InputContainer>
                    <SC.InputContainer>
                        <SC.InputTitle>Số nhà</SC.InputTitle>
                        <SC.InputField
                            defaultValue={defaultValues.address_num}
                            onChangeText={(value: string) => {
                                if (value.length >= 30) {
                                    setState((prev) => ({
                                        ...prev,
                                        defaultValues: {
                                            ...prev.defaultValues,
                                            address_num: value,
                                        },
                                        validations: {
                                            ...prev.validations,
                                            isValidAddressNum: "Tên đường tối đa 30 kí tự",
                                        }
                                    }));
                                } else {
                                    setState((prev) => ({
                                        ...prev,
                                        defaultValues: {
                                            ...prev.defaultValues,
                                            address_num: value,
                                        },
                                        validations: {
                                            ...prev.validations,
                                            isValidAddressNum: null,
                                        }
                                    }));
                                }
                            }}
                        />
                        {validations.isValidAddressNum && isChecked ?
                            <SC.ValidationContainer>
                                <SC.ValidationText>{validations.isValidAddressNum}</SC.ValidationText>
                            </SC.ValidationContainer> : null
                        }
                    </SC.InputContainer>


                    {/* <SC.DefaultAddress>
                        <SC.DefaultAddressCheckBoxContainer>
                            <CheckBox value={isDefaultAddress} onValueChange={(value) => handleCheckBox(value)} />
                        </SC.DefaultAddressCheckBoxContainer>
                        <SC.DefaultAddressText>Đặt làm địa chỉ mặc định</SC.DefaultAddressText>
                    </SC.DefaultAddress> */}

                    <AddressModal visible={citiesModalVisible} items={cities} closeModal={closeCitiesModal} select={selectCity} title="Chọn Tỉnh/Thành" />
                    <AddressModal visible={districtModalVisible} items={districts} closeModal={closeDistrictModal} select={selectDistrict} title="Chọn Quận/Huyện" />
                    <AddressModal visible={wardModalVisible} items={wards} closeModal={closeWardModal} select={selectWard} title="Chọn Phường/Xã" />
                </SC.Form>
                <SC.ActionBar>
                    <SC.Button disabled={submitting} onPress={submitForm}>
                        <SC.ButtonTitle>{addressId ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}</SC.ButtonTitle>
                    </SC.Button>
                </SC.ActionBar>

            </SC.Container>
    );
};

export default AddressDetail;