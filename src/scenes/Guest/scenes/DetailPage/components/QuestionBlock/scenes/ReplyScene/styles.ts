import styled from 'styled-components/native'

const ScrollView = styled.ScrollView`
    background-color: white;
`;
const Container = styled.View`
    height: 100%;
`;


const ReplyForm = styled.View`
    position: absolute;
    bottom: 0;
    height: 8%;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    border-top-color: #eee;
    border-top-width: 1px;
    background-color: white;
`;

const Reply = styled.TextInput`
    width: 80%;
    height: 40px;
    margin-left: 15px;
    margin-right: 15px;
    border-bottom-color: black;
    border-bottom-width: 1px;
`;

const SendButton = styled.TouchableOpacity`
    background-color: #ddd;
    height: 40px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

const SendButtonTitle = styled.Text`

`;

const QuestionContainer = styled.ScrollView`
    margin-bottom: 20px;
`;

export const SC = {
    Container,
    ScrollView,
    QuestionContainer,
    ReplyForm,
    Reply,
    SendButton,
    SendButtonTitle,
};