import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import orderApi from '../../../../services/api/orderApi';
import { formatCurrency } from '../../../../services/helper/currency';
import { RootState } from '../../../../services/redux/rootReducer';
import { fireFetching, fireLoading, skipFetching, skipLoading } from '../../../../services/redux/slices/loaderStatusSlice';
import OrderDetailModel from '../../../../values/models/OrderDetailModel';
import OrderItemModel from '../../../../values/models/OrderItemModel';
import OrderItem from './components/OrderItem';
import OrderTrack from './components/OrderTrack';
import { SC } from './styles';

type OrderDetailProps = {
    order: OrderDetailModel | null,
    laptops: OrderItemModel[],
    promotions: OrderItemModel[],
};

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

    const initialState = React.useMemo<OrderDetailProps>(() => ({
        order: null,
        laptops: [],
        promotions: [],
    }), []);

    const [state, setState] = React.useState(initialState);

    const { order, laptops, promotions } = state;

    const loadData = async () => {
        dispatch(fireLoading());
        const response = await orderApi.getById(parseInt(orderId));
        setState((prev) => ({
            ...prev,
            order: response.data,
            laptops: response.data?.items.filter((i: any) => i.type === "LAPTOP"),
            promotions: response.data?.items.filter((i: any) => i.type === "PROMOTION")
        }))
        dispatch(skipLoading());
        // dispatch(skipFetching());
    };

    useEffect(() => {
        loadData();
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
        )
    );

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
                            <OrderTrack track={track} step={order.tracks.length - index} key={index} />
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