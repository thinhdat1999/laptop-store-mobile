import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { formatCurrency } from '../../../../../../services/helper/currency';
import OrderStatusConstants from '../../../../../../values/constants/OrderStatusConstants';
import OrderOverviewModel from '../../../../../../values/models/OrderOverviewModel';
import { SC } from './styles';


type OrderBlockProps = {
    order: OrderOverviewModel;
};



const OrderBlock = ({ order }: OrderBlockProps) => {

    const navigation = useNavigation();
    
    const viewDetail = (id: number) => {
        navigation.navigate("OrderDetail", { orderId: id });
    }

    return (
        <SC.Container>
            <SC.SectionContainer>
                <SC.SectionHeader>
                    <SC.OrderNo>ĐƠN HÀNG #{order.id}</SC.OrderNo>
                    <SC.Button onPress={() => viewDetail(order.id)}>
                        <SC.ButtonTitle>Xem chi tiết</SC.ButtonTitle>
                    </SC.Button>

                </SC.SectionHeader>
                <SC.InfoRow>
                    <SC.Title>Trạng thái: </SC.Title>
                    <SC.Info>{OrderStatusConstants[order.order_status]}</SC.Info>
                </SC.InfoRow>
                <SC.OverviewContainer>
                    <SC.InfoRow>
                        <SC.Title>Ngày đặt: </SC.Title>
                        <SC.Info>{order.order_date}</SC.Info>
                    </SC.InfoRow>

                </SC.OverviewContainer>
                <SC.InfoRow>
                    <SC.Title>Trị giá: </SC.Title>
                    <SC.Info>{formatCurrency(order.total_price)}đ</SC.Info>
                </SC.InfoRow>
                <SC.InfoRow>
                    <SC.Title>Chi tiết: </SC.Title>
                    <SC.Detail>{order.describe}</SC.Detail>
                </SC.InfoRow>
            </SC.SectionContainer>
        </SC.Container>
    )
}
export default OrderBlock;