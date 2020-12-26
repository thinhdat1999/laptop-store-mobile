import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
    padding: 15px;
`;

const Badge = styled.Text`
    border-radius: 10px;
    background-color: orange;
    min-width: 70%;
    width: 70%;
    color: white;
    text-align: center;
    position: absolute;
    right: 5px;
    top: 8px;
`;

export const SC = {
    Container,
    Badge,
}