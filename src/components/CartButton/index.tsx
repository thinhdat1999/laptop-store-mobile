import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import cartService from '../../services/helper/cartService';
import { RootState } from '../../services/redux/rootReducer';
import { SC } from './styles';

const CartButton = () => {
    const loading = useSelector((state: RootState) => state.loaderStatus.isLoading);

    const [counter, setCounter] = useState<number>(0);

    const navigation = useNavigation();

    const updateCounter = async () => {
        const cart = await cartService.getCart();
        setCounter(Object.values(cart).reduce((a, b) => a + b, 0));
    }

    useEffect(() => {
        if (loading) return;
        updateCounter();
    }, [loading]);

    return (
        <SC.Container onPress={() => {
            navigation.navigate("Cart");
        }}>
            <Icon name="shopping-cart" size={30} color="#bbb" />
            {counter ?
                <SC.Badge>{counter}</SC.Badge> : null}
        </SC.Container>
    );
}

export default CartButton;