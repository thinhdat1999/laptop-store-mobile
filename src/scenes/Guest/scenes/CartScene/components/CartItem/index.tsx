import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import cartService from '../../../../../../services/helper/cartService';
import { formatCurrency } from '../../../../../../services/helper/currency';
import loaderStatusSlice from '../../../../../../services/redux/slices/loaderStatusSlice';
import QuantityInput from '../QuantityInput';
import { SC } from './styles';

const CartItem = (props: any) => {
    const item = props.item;

    const initialState = ({
        loading: true,
        quantity: 0,
    })
    const [state, setState] = useState(initialState);

    const { loading, quantity } = state;

    useEffect(() => {
        const loadData = async () => {
            const cart = await cartService.getCart();
            setState((prev) => ({
                ...prev,
                loading: false,
                quantity: cart[item.id]
            }));
        }
        loadData();
    }, [])


    const removeItem = useCallback(() => {
        cartService.removeItem(item.id);
    }, []);

    const viewLater = () => { }

    return (
        loading ? <ActivityIndicator size={30} color="black" /> :
            <SC.Container>
                <SC.LeftContainer>
                    <Image style={{
                        width: 85,
                        height: 85,
                    }}
                        source={{ uri: `https:/dnstore.codes/api/images/400/laptops/${item.id}/${item.alt}.jpg` }} />
                </SC.LeftContainer>
                <SC.RightContainer>
                    <SC.ItemName>{item.name}</SC.ItemName>
                    <SC.RemoveButton onPress={removeItem}>
                        <Icon name="delete" size={25} color="grey" />
                    </SC.RemoveButton>
                    <SC.Price>
                        <SC.UnitPrice>{formatCurrency(item.unit_price)}đ</SC.UnitPrice> - <SC.OriginPrice>{formatCurrency(item.discount_price)}đ</SC.OriginPrice>
                    </SC.Price>
                    <QuantityInput item={item} quantity={quantity}></QuantityInput>
                </SC.RightContainer>
            </SC.Container>
    );

}
export default CartItem;