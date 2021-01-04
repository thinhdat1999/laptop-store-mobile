import styled from 'styled-components/native';

const Container = styled.View`
    align-items: center;
    justify-content: center;

    display: flex;
    flex-direction: row;
    background-color: white;
    margin-bottom: 10px;
    padding: 0px 10px;
`;

const LeftContainer = styled.View`
    width: 25%;
    align-items: center;
    justify-content: center;
`;

const RightContainer = styled.View`
    width: 75%;
    padding: 10px;
    margin-top: 5px;
`;

const ItemName = styled.Text`

    width: 85%;
    font-weight: bold;
    color: #3B5998;
    padding-left: 10px;
`;

const RemoveButton = styled.TouchableOpacity`
    position: absolute;
    top: 10px;
    right: 10px;
`;


const UnitPrice = styled.Text`
    color: #bf081f;
    font-weight: bold;
    margin-right: 10px;
`;

const OriginPrice = styled.Text`
    text-decoration: line-through;
    font-size: 13px;
    color: #777;
    font-weight: bold;
`;

const Price = styled.Text`
    padding-left: 10px;
`;

const WishlistButton = styled.TouchableOpacity`
`;

export const SC = {
    Container,
    ItemName,
    LeftContainer,
    RightContainer,
    RemoveButton,
    UnitPrice,
    OriginPrice,
    Price,
    WishlistButton,
}