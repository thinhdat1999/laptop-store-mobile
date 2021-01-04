import styled from 'styled-components/native'

const Container = styled.View`
    flex: 1;
`;

const CartItemList = styled.ScrollView`
    height: 80%;
`;

const SummaryContainer = styled.View`
    background-color: white;
    height: 20%;
`;

const InfoRow = styled.View`
    padding: 5px 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const SubTotalTitle = styled.Text`
    font-weight: bold;
    color: #aaa; 
`;

const DiscountTitle = styled.Text`

`;

const CountTitle = styled.Text``;

const TotalCount = styled.Text``;


const SubTotalPrice = styled.Text`
    font-weight: bold;
    color: #bf081f;
    font-size: 20px;
`;

const DiscountPrice = styled.Text`

`;

const CheckoutButton = styled.TouchableOpacity`
    margin-top: 2%;
    width: 90%;
    align-self: center;
    justify-content: center;
    border-radius: 5px;
    height: 40px;
    background-color: red;
`;

const CheckoutButtonTitle = styled.Text`
    color: white;
    font-weight: bold;
    text-align: center;
`;

const Overlay = styled.View`
    background-color: #eee;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    height: 100%;
    align-items:center;
    justify-content: center;
`;

export const SC = {
    Container,
    CartItemList,
    SummaryContainer,
    InfoRow,
    SubTotalTitle,
    DiscountTitle,
    SubTotalPrice,
    DiscountPrice,
    CheckoutButton,
    CheckoutButtonTitle,
    CountTitle,
    TotalCount,
    Overlay,
}