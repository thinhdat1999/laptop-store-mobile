import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
`;

const Form = styled.ScrollView`
    background-color: white;
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
    margin-bottom: 5px;
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
    margin-top: 20px;
    height: 40px;
    justify-content: center;
    align-items: center;
    align-self: center;
    background-color: red;
    width: 90%;
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

const PickerContainer = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: blue;
`;

const Status = styled.Text`
    text-align: center;
    align-self: center;
    color: red;
    background-color: white;
`;

export const SC = {
    Container,
    Form,
    Status,
    InputContainer,
    InputField,
    InputTitle,
    Button,
    ActionBar,
    ButtonTitle,
    ValidationContainer,
    ValidationText,
    PickerContainer,
};