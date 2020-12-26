import styled from "styled-components/native";

const Container = styled.View`
    
`;

const QuestionButton = styled.TouchableOpacity`
    border: 1px solid blue;
    border-radius: 5px;
    width: 90%;
    height: 50px;
    align-self: center;
    align-items: center;
    justify-content: center;
    margin: 10px;
`;

const QuestionButtonTitle = styled.Text`
    color: blue;
`;

const AllQuestionButton = styled.TouchableOpacity`
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

const AllQuestionButtonTitle = styled.Text`
    font-weight: bold;
`;

export const SC = {
    Container,
    QuestionButton,
    QuestionButtonTitle,
    AllQuestionButton,
    AllQuestionButtonTitle,
};