import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { userApi } from '../../../../services/api/userApi';
import { fireFetching, fireLoading, skipFetching } from '../../../../services/redux/slices/loaderStatusSlice';
import OrderOverviewModel from '../../../../values/models/OrderOverviewModel';
import OrderBlock from './components/OrderBlock';
import { SC } from './styles';


type OrderPageState = {
    orders: OrderOverviewModel[];
    orderCount: number;
    page: number;
    isDone: boolean;
    loading: boolean;
};

const OrderScene = ({ navigation }: any) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Đơn hàng của tôi",
            // headerTitleStyle: {textAlign: 'center'},
        })
    }, [])

    const dispatch = useDispatch();

    const initialState = useMemo<OrderPageState>(
        () => ({
            orders: [],
            orderCount: 0,
            page: 1,
            isDone: false,
            loading: true,
        }),
        []
    );


    const [state, setState] = useState<OrderPageState>(initialState);
    const { orders, orderCount, page, isDone, loading } = state;
    useEffect(() => {
        if (!loading) return;
        const loadData = async () => {
            dispatch(orders ? fireLoading() : fireFetching());

            // @ts-ignore
            const response = await userApi.getCurrentUserOrders(page);
            const newOrders = [...orders, ...response.data];
            console.log(newOrders);
            const length = parseInt(response.headers["x-total-count"]);
            setState((prev) => ({
                ...prev,
                orders: newOrders,
                orderCount: length,
                isDone: newOrders.length === length,
                loading: false,
            }));

            dispatch(skipFetching());
        };

        loadData();
    }, [loading]);


    const viewDetail = (id: number) => {
        navigation.navigate("OrderDetail", { orderId: id });
    }
    //TODO: refresh when huỷ đơn.
    return (
        <SC.Container>
            {loading && orderCount === 0 ?
                <ActivityIndicator size="large" color="black" />
                : !loading && orderCount === 0 ?
                    (
                        <SC.EmptyText>Danh sách đơn hàng trống</SC.EmptyText>
                    )
                    : (
                        <FlatList
                            data={Object.values(orders)}
                            keyExtractor={(item) => item.id.toString()}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => {
                                if (!isDone && !loading) {
                                    setState((prev) => ({
                                        ...prev,
                                        page: page + 1,
                                        loading: true,
                                    }))
                                }
                            }}
                            ListFooterComponent={() => loading ? <ActivityIndicator size="large" color="black" /> : null}
                            renderItem={({ item, index }) => (
                                <SC.Item onPress={() => viewDetail(item.id)} index={index}>
                                    <OrderBlock order={item} />
                                </SC.Item>
                            )}
                        />
                    )
            }


        </SC.Container >
    );
}

export default OrderScene;