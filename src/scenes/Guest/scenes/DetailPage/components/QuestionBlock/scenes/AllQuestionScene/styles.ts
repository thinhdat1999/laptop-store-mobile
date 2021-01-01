import styled from 'styled-components/native'

const ScrollView = styled.ScrollView`
    background-color: white;
`;
const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: white;
`;


const ReplyForm = styled.View`
    min-height: 8%;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    border-top-color: #bbb;
    border-top-width: 1px;
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

export const SC = {
    Container,
    ScrollView,
    ReplyForm,
    Reply,
    SendButton,
    SendButtonTitle,
};