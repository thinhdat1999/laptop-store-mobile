import styled from "styled-components/native";

const Step = styled.View`
    border-radius: 3px;
    width: 20px;
    height: 20px;
    padding: 2px;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: #aaa;
    margin-right: 10px;
`;

const Container = styled.View`
    padding: 10px 0px;
    display: flex;
    flex-direction: row;
`;

const InfoContainer = styled.View`
`;

const RightContainer = styled.View`
`;
const Info = styled.Text``;

const Detail = styled.Text`
    color: #777;
    font-style: italic;
`;

export const SC = { Container, Step, InfoContainer, RightContainer, Info, Detail };