import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import addressApi from '../../../../../../services/api/addressApi';
import AddressModel from '../../../../../../values/models/AddressModel';
import { SC } from './styles';

type AddressBlockProps = {
    address: AddressModel;
    isDefaultAddress: boolean;
    reload: any;
};

const AddressBlock = ({ address, isDefaultAddress, reload }: AddressBlockProps) => {
    const navigation = useNavigation();

    const deleteAddress = () => (
        Alert.alert(
            "Confirmation",
            "Xác nhận xoá địa chỉ?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                    }
                },
                {
                    text: "OK", onPress: async () => {
                        try {
                            await addressApi.deleteAddress(address.id);
                            await reload();
                        } catch (err) {
                            alert("Lỗi");
                            throw err;
                        }
                    }
                }
            ],
            { cancelable: false }
        )
    );


    return (
        <SC.Container>
            <SC.BlockHeader>
                <SC.ReceiverName>{address.receiver_name}</SC.ReceiverName>
                <SC.ButtonContainer>
                    <SC.Button onPress={() => {
                        navigation.navigate("AddressDetail", {addressId: address.id});
                    }}>
                        <Icon name="edit" size={25} color="#777" />
                    </SC.Button>
                    <SC.Button onPress={deleteAddress}>
                        <Icon name="trash-o" size={25} color="#777" />
                    </SC.Button>
                </SC.ButtonContainer>
            </SC.BlockHeader>
            <SC.InfoRow>
                <SC.Title>Điện thoại: </SC.Title>
                <SC.Info>{address.receiver_phone}</SC.Info>
            </SC.InfoRow>
            <SC.InfoRow>
                <SC.Title>Địa chỉ: </SC.Title>
                <SC.Info>{address.location}</SC.Info>
            </SC.InfoRow>
            {isDefaultAddress ? (
                <SC.AddressDefaultContainer>
                    <Icon name="check-circle" size={25} color="#007BFF" />
                    <SC.AddressDefault>Địa chỉ mặc định</SC.AddressDefault>
                </SC.AddressDefaultContainer>
            ) : null}

        </SC.Container>
    );
}

export default AddressBlock;