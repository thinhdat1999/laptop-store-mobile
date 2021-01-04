import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import orderApi from '../../../../services/api/orderApi';
import { userApi } from '../../../../services/api/userApi';
import { formatCurrency } from '../../../../services/helper/currency';
import AddressModel from '../../../../values/models/AddressModel';
import OrderCheckoutModel from '../../../../values/models/OrderCheckoutModel';
import CheckoutItem from './components/CheckoutItem';
import DeliveryAddress from './components/DeliveryAddress';
import { SC } from './styles';

type CheckoutPageState = {
    loading: boolean;
    checkout: OrderCheckoutModel;
    addresses: AddressModel[];
};
const CheckoutScene = ({ navigation, route }: any) => {

    const { newAddresses } = route.params;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Thanh toán",
            // headerTitleStyle: {textAlign: 'center'},
        })
    }, [])

    const initialState = useMemo<CheckoutPageState>(
        () => ({
            loading: true,
            checkout: {
                transport_fee: 0,
                laptop_count: 0,
                promotion_count: 0,
                total_price: 0,
                laptop_price: 0,
                promotion_price: 0,
                order_date: "",
                delivery_date: "",
                items: [],
            },
            addresses: []
        }),
        []
    );
    const [submitting, setSubmitting] = useState<boolean>(false);

    const [state, setState] = useState<CheckoutPageState>(initialState);
    const { loading, checkout, addresses } = state;

    useEffect(() => {
        const loadData = async () => {
            const [checkoutResponse, addressesResponse] = await Promise.all([
                userApi.getCurrentUserCheckout(),
                userApi.getCurrentUserAddresses(),
            ]);

            if (checkoutResponse.data.laptop_count === 0) {
                navigation.navigate("Cart");
                return;
            }

            setState({
                loading: false,
                checkout: checkoutResponse.data,
                addresses: addressesResponse.data,
            });
        };
        loadData();
    }, []);

    useEffect(() => {
        if(newAddresses && newAddresses[0]?.id !== addresses[0]?.id) {
            setState((prev) => ({
                ...prev,
                addresses: newAddresses,
            }));
        }
    }, [newAddresses])

    const addAddress = useCallback(() => {
        //navigate to create addrress scene
        // navigation.navigate("CreateAddress");
    }, []);

    const editAddress = useCallback(() => {
        // @ts-ignore
        //get addressID and go to edit scene
    }, []);

    const submitCheckout = useCallback(async () => {
        setSubmitting(true);
        try {
            // @ts-ignore
            const addressId = addresses[0].id;
            console.log(addressId);
            const response = await orderApi.postOrder(addressId);
            const orderId = response.data;
            navigation.navigate("OrderDetail", {orderId: orderId});
            // Navigate sang trang track order
        } catch (err) {
            setSubmitting(false);
            throw err;
        }
    }, [addresses]);


    return (
        loading ? <ActivityIndicator size="large" color="black" /> :
            <SC.Container>
                <SC.Content>
                    <SC.SectionContainer>
                        <SC.SectionHeader>
                            <SC.SectionHeaderTitle>Địa chỉ nhận hàng</SC.SectionHeaderTitle>
                            <SC.Button onPress={() => {
                                navigation.navigate("ReceiverAddress", { addresses: addresses, choosen: addresses[0] });
                            }}>
                                <SC.ButtonTitle>Thay đổi</SC.ButtonTitle>
                            </SC.Button>
                        </SC.SectionHeader>
                        <DeliveryAddress addresses={addresses} />
                    </SC.SectionContainer>
                    <SC.SectionContainer>
                        <SC.SectionHeader>
                            <SC.SectionHeaderTitle>Danh sách sản phẩm</SC.SectionHeaderTitle>
                        </SC.SectionHeader>
                        <SC.ItemList>
                            {checkout.items
                                .filter((item) => item.type === "LAPTOP")
                                .map((item) => (
                                    <CheckoutItem item={item} key={item.id} />
                                ))}
                        </SC.ItemList>
                    </SC.SectionContainer>
                    <SC.SectionContainer>
                        <SC.SectionHeader>
                            <SC.SectionHeaderTitle>Danh sách khuyến mãi</SC.SectionHeaderTitle>
                        </SC.SectionHeader>
                        <SC.ItemList>
                            {checkout.items
                                .filter((item) => item.type === "PROMOTION")
                                .map((item) => (
                                    <CheckoutItem item={item} key={item.id} />
                                ))}
                        </SC.ItemList>
                    </SC.SectionContainer>
                    <SC.SectionContainer>
                        <SC.SectionHeader>
                            <SC.SectionHeaderTitle>Thông tin vận chuyển</SC.SectionHeaderTitle>
                        </SC.SectionHeader>
                        <SC.InfoRow>
                            <SC.LeftText>Ngày đặt hàng: </SC.LeftText>
                            <SC.RightText>{checkout.order_date}</SC.RightText>
                        </SC.InfoRow>
                        <SC.InfoRow>
                            <SC.LeftText>Dự kiến giao: </SC.LeftText>
                            <SC.RightText>{checkout.delivery_date}</SC.RightText>
                        </SC.InfoRow>
                        <SC.InfoRow>
                            <SC.LeftText>Phí vận chuyển: </SC.LeftText>
                            <SC.RightText>{formatCurrency(checkout.transport_fee)}đ</SC.RightText>
                        </SC.InfoRow>
                        <SC.InfoRow>
                            <SC.LeftText>Tạm tính: </SC.LeftText>
                            <SC.RightText style={{
                                fontWeight: "bold"
                            }}>{formatCurrency(checkout.laptop_price)}đ</SC.RightText>
                        </SC.InfoRow>
                    </SC.SectionContainer>
                </SC.Content>
                <SC.SummaryContainer>
                    <SC.InfoRow>
                        <SC.LeftText>Tổng thanh toán:</SC.LeftText>
                        <SC.RightText total style={{
                            fontWeight: "bold",
                            color: "#BF081F",
                        }}>{formatCurrency(checkout.total_price)}đ</SC.RightText>
                    </SC.InfoRow>
                    <SC.CheckoutButton disabled={submitting || addresses.length === 0} onPress={submitCheckout}>
                        <SC.CheckoutButtonTitle>ĐẶT HÀNG</SC.CheckoutButtonTitle>
                    </SC.CheckoutButton>
                </SC.SummaryContainer>
            </SC.Container>
    )
}

export default CheckoutScene;