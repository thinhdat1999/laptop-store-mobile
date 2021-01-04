import React, { memo } from "react";
import { formatCurrency } from "../../../../../../services/helper/currency";
import OrderItemModel from "../../../../../../values/models/OrderItemModel";
import { SC } from "./styles";

type CheckoutItemProps = {
    item: OrderItemModel;
};

const CheckoutItem = ({ item }: CheckoutItemProps) => {
    const Image = () =>
        item.type === "LAPTOP" ? (
            <SC.LaptopImage
                style={{
                    width: 60,
                    height: 60,
                }}
                source={{ uri: `https:/dnstore.codes/api/images/150/laptops/${item.id}/laptop.jpg` }} />
        ) : (
                <SC.PromotionImage
                    style={{
                        width: 60,
                        height: 60,
                    }}
                    source={{ uri: `https:/dnstore.codes/api/images/200/promotions/${item.id}/promotion.jpg` }}
                />
            );

    return (
        <SC.Container>
            <SC.LeftContainer>
                <Image />
            </SC.LeftContainer>

            <SC.RightContainer>
                <SC.ItemName numberOfLines={1}>{item.name}</SC.ItemName>
                <SC.Summary>
                    <SC.ItemPrice>
                        {formatCurrency(item.unit_price)}đ 
                    </SC.ItemPrice> x {item.quantity} = <SC.TotalPrice>
                        {formatCurrency(item.total_price)}đ
                    </SC.TotalPrice>
                </SC.Summary>
            </SC.RightContainer>
        </SC.Container>
    );
};

export default memo(CheckoutItem);