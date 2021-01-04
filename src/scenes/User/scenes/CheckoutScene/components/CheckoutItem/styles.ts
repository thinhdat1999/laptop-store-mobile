import styled from 'styled-components/native'

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    border-bottom-color: #eee;
    border-bottom-width: 1px;
    padding: 10px 0px;
`;

const LaptopImage = styled.Image`
    padding: 10px;
    background-color: white;
`;

const PromotionImage = styled.Image`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 10px;
`;

const ItemName = styled.Text`
    color: #aaa;
`;

const ItemPrice = styled.Text`
    font-weight: bold;
`;

const TotalPrice = styled.Text`
    color: #BF081F;
    font-weight: bold;
`;

const Summary = styled.Text``;

const LeftContainer = styled.View`
    width: 20%;
    align-items: center;
    justify-content: center;
    padding: 0px 15px;
`;

const RightContainer = styled.View`
    width: 80%;
    padding: 10px 15px;
`;

export const SC = {
    Container,
    LaptopImage,
    PromotionImage,
    ItemName,
    ItemPrice,
    TotalPrice,
    Summary,
    LeftContainer, 
    RightContainer,
}