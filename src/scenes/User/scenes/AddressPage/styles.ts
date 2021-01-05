import styled from 'styled-components/native'

const Container = styled.View`
    flex: 1;
`;

const ScrollView = styled.ScrollView`
    height: 80%;
`;

const ActionBar = styled.View`
    height: 10%;
    padding: 10px;
    background-color: white;
    justify-content: center;
    align-items: center;
    border-top-width: 1px;
    border-top-color: #aaa;
`;

const Button = styled.TouchableOpacity`
    height: 40px;
    justify-content: center;
    align-items: center;
    background-color: red;
    width: 100%;
    border-radius: 5px;
`;

const ButtonTitle = styled.Text`
    font-weight: bold;
    color: white;
`;
const Text = styled.Text`
    color: red;
`;

export const SC = {
    Container,
    Text,
    ScrollView,
    ActionBar,
    Button,
    ButtonTitle,
};