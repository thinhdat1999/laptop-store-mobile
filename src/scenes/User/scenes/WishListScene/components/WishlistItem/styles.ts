import styled from "styled-components/native";

const Container = styled.View`
    width: 100%;
    text-decoration: none;
    background-color: white;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
`;

const ScrollView = styled.ScrollView`

`;

const InfoContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

const ItemInfo = styled.View`
    padding: 10px 15px;
    width: 75%;
`;

const ImageContainer = styled.View`
    align-items: center;
    justify-content: center;
    width: 25%;
`;

const ItemImage = styled.Image`
`;

const ItemSpec = styled.Text`
    color: #007bff;
    margin-bottom: 2px;
    font-size: 12px;
    color: #666;
    font-weight: 600;
`;

const ItemRating = styled.Text`
    color: darkorange;
`;

const ItemName = styled.Text`
    font-size: 15px;
    color: #3b5998;
    font-weight: bold;
    margin-bottom: 5px;
    width: 90%;
`;
const Price = styled.Text`
    /* flex-direction: row; */
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
`;

const DeleteButton = styled.TouchableOpacity`
    position: absolute;
    top: 15px;
    right: 10px;
    align-items: center;
    justify-content: center;
`;

export const SC = {
    Container,
    ScrollView,
    InfoContainer,
    ItemInfo,
    ImageContainer,
    ItemImage,
    ItemSpec,
    ItemRating,
    ItemName,
    Price,
    UnitPrice,
    OriginPrice,
    DeleteButton,
};