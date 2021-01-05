import styled from 'styled-components/native'

const Container = styled.View`
    flex: 1;
`;

const Form = styled.ScrollView`
    height: 90%;
`;
const InputContainer = styled.View`
    padding: 15px;
    background-color: white;
`;
const InputField = styled.TextInput`
    background-color: white;
    border-bottom-width: 1px;
    border-bottom-color: blue;
`;

const InputTitle = styled.Text`

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

const ValidationContainer = styled.View`

`;

const ValidationText = styled.Text`
    color: red;
`;


export const SC = {
    Container,
    Form,
    InputContainer,
    InputField,
    InputTitle,
    Button,
    ActionBar,
    ButtonTitle,
    ValidationContainer,
    ValidationText
};