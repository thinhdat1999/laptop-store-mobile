import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SC } from './styles';

const EmptyBlock = () => {
    const navigation = useNavigation();

    return (
        <SC.Container>
            <Icon name="shopping-cart" size={200} color="#bbb" />
            <SC.Title>Bạn chưa có sản phẩm nào trong giỏ hàng</SC.Title>
            <SC.Button onPress={()=>{
                navigation.navigate("Home");
            }}>
                <SC.ButtonTitle>Tiếp tục mua sắm</SC.ButtonTitle>
            </SC.Button>
        </SC.Container>
    );
}
export default EmptyBlock;