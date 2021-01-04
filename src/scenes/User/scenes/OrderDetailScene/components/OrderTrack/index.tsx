import React from "react";
import OrderTrackModel from "../../../../../../values/models/OrderTrackModel";
import { SC } from "./styles";

type OrderTrackProps = {
    track: OrderTrackModel;
    step: number;
};
const OrderTrack = ({ track, step }: OrderTrackProps) => (
    <SC.Container>
        <SC.Step><SC.Info>{step}</SC.Info></SC.Step>
        <SC.InfoContainer>
            <SC.Info>{track.status}</SC.Info>
            <SC.Detail>{track.created_at}</SC.Detail>
        </SC.InfoContainer>
    </SC.Container>
);

export default OrderTrack;