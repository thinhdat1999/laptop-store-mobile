import React from 'react';
import AddressModel from '../../../../../../values/models/AddressModel';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SC } from "./styles";
import { useNavigation } from '@react-navigation/native';

type DeliveryAddressProps = {
    addresses: AddressModel[];
};

const DeliveryAddress = ({ addresses }: DeliveryAddressProps) => {
    const navigation = useNavigation();
    return (
        <SC.Container>
            {addresses.length === 0 ? (
                <SC.EmptyBlock>
                    <Icon name="address-book" size={200} color="#bbb" />
                    <SC.Title>Bạn cần tối thiểu 01 địa chỉ để tiến hành đặt hàng</SC.Title>
                    <SC.Button onPress={() => {
                        // navigation.navigate("CreateAddress");
                    }}>
                        <SC.ButtonTitle>Thêm địa chỉ</SC.ButtonTitle>
                    </SC.Button>
                </SC.EmptyBlock>
            ) :
                addresses.slice(0, 1).map((address) => (
                    <SC.AddressContainer key ={address.id}>
                        <SC.ReceiverInfo>{address.receiver_name} - {address.receiver_phone}</SC.ReceiverInfo>
                        <SC.AddressInfo>{address.location}</SC.AddressInfo>
                    </SC.AddressContainer>
                ))
            }
        </SC.Container >
    );
};

export default DeliveryAddress;