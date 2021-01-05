import React from 'react';
import { View } from 'react-native';
import { userApi } from '../../../../../../services/api/userApi';
import AddressModel from '../../../../../../values/models/AddressModel';
import { SC } from './styles';


type ReceiverAddressState = {
    addressList: AddressModel[],
    curAddress: AddressModel,
}
const ReceiverAddressScene = ({ navigation, route }: any) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Địa chỉ nhận hàng",
            // headerTitleStyle: {textAlign: 'center'},
        })
    }, [])

    const { addresses, choosen } = route.params;

    const initialState: ReceiverAddressState = {
        addressList: addresses,
        curAddress: choosen,
    }

    const [state, setState] = React.useState<ReceiverAddressState>(initialState);
    const { addressList, curAddress } = state;
    const changeCurrentAddress = (address: AddressModel) => {
        setState((prev) => ({
            ...prev,
            curAddress: address,
        }));
    }

    const setReceiverAddress = () => {
        addressList.splice(addressList.indexOf(curAddress), 1);
        addressList.unshift(curAddress);
        navigation.navigate("Checkout", { newAddresses: addressList });
    }


    const loadData = async () => {
        const response = await userApi.getCurrentUserAddresses();
        setState((prev) => ({
            ...prev,
            addressList: response.data,
        }));
    }
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <SC.Container>
            <SC.AddressList>
                {addressList.map((address: any) => (
                    <SC.AddressItem final={addressList.indexOf(address) === addressList.length - 1} key={address.id}>
                        <SC.LeftContainer>
                            <SC.Picker onPress={() => changeCurrentAddress(address)}>
                                <SC.PickerOuter>
                                    {address.id === curAddress.id ? <SC.Choosen /> : null}
                                </SC.PickerOuter>
                            </SC.Picker>
                        </SC.LeftContainer>
                        <SC.RightContainer>
                            <SC.AddressContainer key={address.id}>
                                <SC.ReceiverInfo>{address.receiver_name} - {address.receiver_phone}</SC.ReceiverInfo>
                                <SC.AddressInfo>{address.location}</SC.AddressInfo>
                            </SC.AddressContainer>
                        </SC.RightContainer>
                    </SC.AddressItem>
                ))}
                <SC.NewAddressContainer>
                    <SC.NewAddressButton onPress={() => {
                        navigation.navigate("CreateAddress", { addressId: null });
                    }}>
                        <SC.NewAddressButtonTitle>Thêm địa chỉ mới</SC.NewAddressButtonTitle>
                    </SC.NewAddressButton>
                </SC.NewAddressContainer>
            </SC.AddressList>
            <SC.ActionBar>
                <SC.Button onPress={setReceiverAddress}>
                    <SC.ButtonTitle>Chọn địa chỉ này để giao hàng</SC.ButtonTitle>
                </SC.Button>
            </SC.ActionBar>




        </SC.Container>
    );
}
export default ReceiverAddressScene;