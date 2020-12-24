import styled from 'styled-components/native'



const ScrollView = styled.ScrollView`
    max-height: 320px;
    background-color: white;
`;

const Pagination = styled.Text`
    color: white;
    position: absolute;
    bottom: 10px;
    right: 10px;
    border-radius: 10px;
    background-color: grey;
    padding: 2px 5px;
    margin-top: 10px;
`;

const Text = styled.Text`
    margin-left: 10px;
`;

const Container = styled.View`
    background-color: white;
`;

const RatingContainer = styled.View`
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const PriceContainer = styled.View`
    margin-left: 10px;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;
const UnitPrice = styled.Text`
    color: #bf081f;
    font-size: 18px;
    font-weight: bold;
`;

const OriginalPrice = styled.Text`
    margin-left: 5px;
    font-size: 13px;
    text-decoration: line-through;
`;

const DiscountPrice = styled.Text`
    margin-left: 5px;
    font-size: 12px;

`;
export const SC = {
    Pagination,
    ScrollView,
    Text,
    Container,
    RatingContainer,
    PriceContainer,
    UnitPrice,
    OriginalPrice, 
    DiscountPrice,
};