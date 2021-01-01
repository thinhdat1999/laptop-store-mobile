import styled from 'styled-components/native';

const Container = styled.View`
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    background-color: white;
    margin-bottom: 10px;
`;

const LeftContainer = styled.View`
    width: 32%;
    align-items: center;
`;

const RightContainer = styled.View`
    width: 68%;
    padding: 10px;
    
`;
const ItemName = styled.Text`
    width: 90%;
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
    text-decoration: underline;
`;

const OriginPrice = styled.Text`
    text-decoration: line-through;
    font-size: 13px;
    color: #777;
    text-decoration: line-through;
    font-weight: bold;
`;

const Price = styled.Text`
    padding-left: 10px;
`;


export const SC = {
    Container,
    ItemName,
    LeftContainer,
    RightContainer,
    RemoveButton,
    UnitPrice,
    OriginPrice,
    Price
}