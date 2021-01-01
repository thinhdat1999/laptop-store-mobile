import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import laptopApi from '../../../../services/api/laptopApi';
import cartService from '../../../../services/helper/cartService';
import { formatCurrency } from '../../../../services/helper/currency';
import { RootState } from '../../../../services/redux/rootReducer';
import loaderStatusSlice, { skipFetching } from '../../../../services/redux/slices/loaderStatusSlice';
import store from '../../../../services/redux/store';
import ProductOverviewModel from '../../../../values/models/ProductSummaryModel';
import CartPaymentProps from '../../../../values/props/CartPaymentProps';
import CartItem from './components/CartItem';
import { SC } from './styles';

type CartPageState = {
    items: ProductOverviewModel[] | null;
    payment: CartPaymentProps;
};


const CartScene = ({navigation}: any) => {

    const initialState: CartPageState = useMemo(
        () => ({
            items: null,
            payment: {
                totalCount: 0,
                totalDiscount: 0,
                totalPrice: 0,
            },
        }),
        []
    );

    const [state, setState] = useState<CartPageState>(initialState);
    const loaderStatus = useSelector((state: RootState) => state.loaderStatus);
    let { items, payment } = state;

    useEffect(() => {
        const loadData = async () => {
            if (items && !loaderStatus.isFetching) {
                return;
            }
            if (await cartService.isEmptyCart()) {
                const emptyCartState = { ...initialState, loading: false, items: [] };
                setState(emptyCartState);
            } else {
                const cart = await cartService.getCart();
                const ids = Object.keys(cart).map((k) => +k);
                const response = await laptopApi.getByIds(ids);
                const items = response.data;

                let totalCount = 0;
                let totalDiscount = 0;
                let totalPrice = 0;

                // @ts-ignore
                for (const item of items) {
                    totalCount += cart[item.id];
                    totalDiscount += cart[item.id] * item.discount_price;
                    totalPrice += cart[item.id] * item.unit_price;
                }

                setState((prev) => ({
                    ...prev,
                    items: items,
                    payment: {
                        ...prev.payment,
                        totalCount: totalCount,
                        totalDiscount: totalDiscount,
                        totalPrice: totalPrice,
                    },
                }))
            }
            store.dispatch(skipFetching());
        }

        loadData();
    }, [loaderStatus])

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `Giỏ hàng`,
            // headerTitleStyle: {textAlign: 'center'},
        })
    }, [])

    return (

        <SC.Container>
            {loaderStatus.isLoading ? <SC.Overlay><ActivityIndicator size="large" color="black" /></SC.Overlay> : null}
                {/* // ? <ActivityIndicator size="large" color="black" /> : null} */}
            <SC.CartItemList>
                {items ? items.map((item) => <CartItem key={item.id} item={item} />) : null}
            </SC.CartItemList>
            <SC.SummaryContainer>
                <SC.InfoRow>
                    <SC.CountTitle>Tổng sản phẩm:</SC.CountTitle>
                    <SC.TotalCount>{payment.totalCount}</SC.TotalCount>
                </SC.InfoRow>
                <SC.InfoRow>
                    <SC.DiscountTitle>Tổng giảm giá:</SC.DiscountTitle>
                    <SC.DiscountPrice>{formatCurrency(payment.totalDiscount)}đ</SC.DiscountPrice>
                </SC.InfoRow>
                <SC.InfoRow>
                    <SC.SubTotalTitle>Tạm tính: </SC.SubTotalTitle>
                    <SC.SubTotalPrice>{formatCurrency(payment.totalPrice)}đ</SC.SubTotalPrice>
                </SC.InfoRow>

                <SC.CheckoutButton>
                    <SC.CheckoutButtonTitle>Tiến hành đặt hàng</SC.CheckoutButtonTitle>
                </SC.CheckoutButton>
            </SC.SummaryContainer>
        </SC.Container>
    );

}

export default CartScene;