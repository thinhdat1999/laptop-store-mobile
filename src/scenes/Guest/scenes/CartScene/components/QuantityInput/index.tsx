import React, { useEffect, useState } from 'react';
import cartService from '../../../../../../services/helper/cartService';
import { fireFetching, fireLoading } from '../../../../../../services/redux/slices/loaderStatusSlice';
import { setMessage } from '../../../../../../services/redux/slices/messageSlice';
import store from '../../../../../../services/redux/store';
import CartConstants from '../../../../../../values/constants/CartConstants';
import ProductOverviewModel from '../../../../../../values/models/ProductSummaryModel';
import { SC } from './styles';

type QuantityProps = {
    quantity: number,
    item: ProductOverviewModel,
    value: string,
    favorite: boolean,
}
const QuantityInput = (props: any) => {

    const initialState = {
        quantity: props.quantity,
        item: props.item,
        value: props.quantity + "",
        favorite: false,
    }
    const [state, setState] = useState<QuantityProps>(initialState);
    const { quantity, item, value, favorite } = state;

    useEffect(() => {
        const syncData = async () => {
            const cart = await cartService.getCart();
            if (cart[item.id] === quantity) {
                return;
            }

            try {
                store.dispatch(fireLoading());
                cart[item.id] = quantity;
                await cartService.syncStorage(cart);
                store.dispatch(fireFetching());
            } catch (err) {
                alert("Loi");
            }
        };
        syncData();
    }, [quantity]);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setState((prev) => ({
                ...prev,
                quantity: quantity - 1,
                value: quantity - 1 + "",
            }));
        }
    }

    const increaseQuantity = async () => {
        let message: string | null = null;
        const curCartQuantity = await cartService.getTotalQuantity();

        if (quantity >= CartConstants.MAX_QUANTITY_PER_ITEM) {
            message = `Tối đa ${CartConstants.MAX_QUANTITY_PER_ITEM} 
            Laptop ${item.name} trong giỏ hàng`;
        } else if (curCartQuantity >= CartConstants.MAX_TOTAL_QUANTITY) {
            message = `Tổng số lượng sản phẩm trong giỏ hàng không được vượt quá 
            ${CartConstants.MAX_TOTAL_QUANTITY} sản phẩm`;
        }

        if (message) {
            store.dispatch(setMessage(message));
        } else {
            setState((prev) => ({
                ...prev,
                quantity: quantity + 1,
                value: quantity + 1 + "",
            }));
            message = `Đã thêm Laptop ${item.name} vào giỏ hàng (hiện có: ${quantity + 1
                })`;
            store.dispatch(setMessage(message));
        }
    }

    const editQuantity = async (event: any) => {
        if (event.nativeEvent.text > 10) {
            event.nativeEvent.text = 10;
        } else if (event.nativeEvent.text < 1) {
            event.nativeEvent.text = 1;
        }
        const value = parseInt(event.nativeEvent.text) - quantity;
        if (value > 0) {
            const curCartQty = await cartService.getTotalQuantity();
            let message = null;
            if (curCartQty + value > CartConstants.MAX_TOTAL_QUANTITY) {
                message = `Tổng số lượng sản phẩm trong giỏ hàng không được vượt quá 
                            ${CartConstants.MAX_TOTAL_QUANTITY} sản phẩm`;
            }
            if (message) {
                store.dispatch(setMessage(message));
                event.nativeEvent.text = quantity.toString();
                return;
            }
        }
        setState((prev) => ({
            ...prev,
            quantity: quantity + value,
            value: quantity + value + "",
        }));
    }

    const checkValue = (value: string) => {
        const parsedQty = parseInt(value);
        if (isNaN(parsedQty) || parsedQty === 0) {
            setState((prev) => ({
                ...prev,
                value: value,
            }));
        }
        else if (parsedQty < 1) {
            setState((prev) => ({
                ...prev,
                value: 1 + "",
            }));
        }
        else if (parsedQty > 10) {
            setState((prev) => ({
                ...prev,
                value: 10 + "",
            }));
        } else {
            setState((prev) => ({
                ...prev,
                value: parsedQty + "",
            }));
        }
    }

    return (
        <SC.Container>
            <SC.QuantityInputContainer>
                <SC.DecreaseButton onPress={decreaseQuantity}>
                    <SC.DecreaseButtonTitle>-</SC.DecreaseButtonTitle>
                </SC.DecreaseButton>
                <SC.QuantityInput maxLength={2} keyboardType="numeric" value={value} onChangeText={checkValue} onEndEditing={editQuantity} />
                <SC.IncreaseButton onPress={increaseQuantity}>
                    <SC.IncreaseButtonTitle>+</SC.IncreaseButtonTitle>
                </SC.IncreaseButton>
            </SC.QuantityInputContainer>

            {/* <SC.WishlistButton onPress={changeFavorite}>
                {favorite
                    ? <Icon name="favorite" size={25} color="red" />
                    : <Icon name="favorite-border" size={25} color="grey" />}

            </SC.WishlistButton> */}
        </SC.Container>
    );
}
export default QuantityInput;