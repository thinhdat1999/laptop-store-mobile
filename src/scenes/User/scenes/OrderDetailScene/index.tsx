import React, { useCallback, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import orderApi from '../../../../services/api/orderApi';
import { formatCurrency } from '../../../../services/helper/currency';
import { RootState } from '../../../../services/redux/rootReducer';
import { fireFetching, skipFetching } from '../../../../services/redux/slices/loaderStatusSlice';
import { fetchOrderById } from '../../../../services/redux/slices/orderSlice';
import { SC } from './styles';
import OrderTrack from './components/OrderTrack';
import OrderItem from './components/OrderItem';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
const OrderDetailScene = ({ navigation, route }: any) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Đơn hàng",
            // headerTitleStyle: {textAlign: 'center'},
        })
    }, [])

    const { orderId } = route.params;

    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.loaderStatus.isLoading);
    const order = useSelector((state: RootState) => state.order);
    const laptops = order?.items.filter((i) => i.type === "LAPTOP");
    const promotions = order?.items.filter((i) => i.type === "PROMOTION");

    const loadData = async () => {
        dispatch(fireFetching());
        await dispatch(fetchOrderById(parseInt(orderId)));
        dispatch(skipFetching());
    };

    useEffect(() => {
        loadData();
    }, []);

    const cancelOrder = useCallback(async () => {
        openConfirmDialog();
        // let confirmCancel = false;
        // const confirmCancel = openConfirmDialog();
        // if (confirmCancel) {
        //     await orderApi.postCancelOrder(parseInt(orderId));
        // }
    }, []);

    const openConfirmDialog = () => (
        Alert.alert(
            "Confirmation",
            "Bạn có muốn huỷ đơn hàng không?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                    }
                },
                {
                    text: "OK", onPress: async () => {
                        await orderApi.postCancelOrder(parseInt(orderId));
                        loadData();
                    }
                }
            ],
            { cancelable: false }
        ));

    return loading || !order ? <ActivityIndicator size="large" color="black" /> : (
        <SC.Container>
            <SC.ScrollView>
                <SC.SectionContainer>
                    <SC.LeftContainer>
                        <Icon name="receipt" size={25} color="blue" />
                    </SC.LeftContainer>
                    <SC.RightContainer>
                        <SC.SectionHeader>
                            <SC.SectionTitle>Mã Đơn Hàng: {orderId}</SC.SectionTitle>
                        </SC.SectionHeader>
                        <SC.OrderDate>Ngày đặt hàng: {order.order_date}</SC.OrderDate>
                        <SC.DeliveryDate>Dự kiến giao: {order.delivery_date}</SC.DeliveryDate>
                        <SC.Total>Tổng thanh toán: {formatCurrency(order.total_price)}đ</SC.Total></SC.RightContainer>
                </SC.SectionContainer>
                <SC.SectionContainer>
                    <SC.LeftContainer>
                        <Icon name="home" size={25} color="blue" />
                    </SC.LeftContainer>
                    <SC.RightContainer>
                        <SC.SectionHeader>
                            <SC.SectionTitle>Địa Chỉ Người Nhận</SC.SectionTitle>
                        </SC.SectionHeader>
                        <SC.AddressContainer>
                            <SC.ReceiverInfo>{order.receiver_name} - {order.receiver_phone}</SC.ReceiverInfo>
                            <SC.AddressInfo>{order.order_location}</SC.AddressInfo>
                        </SC.AddressContainer>
                    </SC.RightContainer>
                </SC.SectionContainer>
                <SC.SectionContainer>
                    <SC.LeftContainer>
                        <MaterialIcon name="truck-delivery" size={25} color="blue" />
                    </SC.LeftContainer>
                    <SC.RightContainer>
                        <SC.SectionHeader>
                            <SC.SectionTitle>Theo Dõi Đơn Hàng</SC.SectionTitle>
                        </SC.SectionHeader>
                        {order.tracks.map((track, index) => (
                            <OrderTrack track={track} step={order.tracks.length - index} key={index}/>
                        ))}
                    </SC.RightContainer>
                </SC.SectionContainer>

                <SC.ItemContainer>
                    <SC.Header>
                        <SC.LeftContainer>
                            <FontAwesome5 name="boxes" size={25} color="blue" />
                        </SC.LeftContainer>
                        <SC.RightContainer>
                            <SC.SectionHeader>
                                <SC.SectionTitle>Danh Sách Sản Phẩm</SC.SectionTitle>
                            </SC.SectionHeader>
                        </SC.RightContainer>
                    </SC.Header>
                    {laptops?.map((item) => (
                        <OrderItem item={item} key={item.id} />
                    ))}
                </SC.ItemContainer>

                <SC.ItemContainer>
                    <SC.Header>
                        <SC.LeftContainer>
                            <FontAwesome5 name="gift" size={25} color="blue" />
                        </SC.LeftContainer>
                        <SC.RightContainer>
                            <SC.SectionHeader>
                                <SC.SectionTitle>Danh Sách Khuyến Mãi</SC.SectionTitle>
                            </SC.SectionHeader>
                        </SC.RightContainer>
                    </SC.Header>
                    {promotions?.map((item) => (
                        <OrderItem item={item} key={item.id} />
                    ))}
                </SC.ItemContainer>
            </SC.ScrollView>

            {order.progress_step === -1 || order.progress_step >= 3 ? null : (
                <SC.ActionBar>
                    <SC.Button onPress={openConfirmDialog}>
                        <SC.ButtonTitle>Huỷ đơn hàng</SC.ButtonTitle>
                    </SC.Button>
                </SC.ActionBar>
            )}

        </SC.Container>
    );
}

export default OrderDetailScene;