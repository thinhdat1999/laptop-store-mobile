import styled from "styled-components/native";

const Container = styled.View`
    
`;

const AllRatingButton = styled.TouchableOpacity`
    background-color: #eee;
    width: 30%;
    height: 35px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 15px;
    top: -37.5px;
`;

const AllRatingButtonTitle = styled.Text`
    font-weight: bold;
`;


export const SC = {
    Container,
    AllRatingButton,
    AllRatingButtonTitle,
};