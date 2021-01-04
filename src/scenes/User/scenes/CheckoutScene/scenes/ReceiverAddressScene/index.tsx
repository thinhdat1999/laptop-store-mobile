import React from 'react';
import AddressModel from '../../../../../../values/models/AddressModel';
import { SC } from './styles';

const ReceiverAddressScene = ({ navigation, route }: any) => {
    const { addresses, choosen } = route.params;

    const [curAddress, setAddress] = React.useState(choosen);

    const changeCurrentAddress = (address: AddressModel) => {
        setAddress(address);
    }

    const setReceiverAddress = () => {
        addresses.splice(addresses.indexOf(curAddress), 1);
        addresses.unshift(curAddress);
        navigation.navigate("Checkout", {newAddresses : addresses});
    }
    return (
        <SC.Container>
            <SC.AddressList>
                {addresses.map((address: any) => (
                    <SC.AddressItem final={addresses.indexOf(address) === addresses.length - 1} key ={address.id}>
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