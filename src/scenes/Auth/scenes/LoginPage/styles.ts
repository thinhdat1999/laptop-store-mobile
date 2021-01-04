import { Field } from 'formik';
import styled from 'styled-components/native'

const Container = styled.View`
    flex: 1;
    padding: 30px;
    background-color: white;
    align-items: flex-start;
    justify-content: center;
`;

const Header = styled.Text`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const Submit = styled(Field)`
    width: 100%;
    background-color: #727272;
    color: white;
    padding: 10px;
    border-radius: 5px;
    border: none;
    margin-bottom: 12px;
    cursor: pointer;
`;

const Status = styled.Text`
    text-align: center;
    align-self: center;
    color: red;
`;

const TextInput = styled.TextInput`
    width: 100%;
    border-radius: 10px;
    border: 2px solid #bbb;
    padding: 10px;
    background-color: white;
    border-radius: 5px;
    height: 50px;
    margin-bottom: 20px;
    justify-content: center;
`;

const SubText = styled.Text`
    color: grey;
    margin-bottom: 20%;
    font-size: 18px;
`;
const InputTitle = styled.Text`
    color: #bbb;
    margin-bottom: 5px;
`
const RegisterRedirect = styled.View``;

const Button = styled.TouchableOpacity`
    width: 100%;
    border-radius: 5px;
    background-color: grey;
    height: 50px;
    justify-content: center;
`
const ButtonTitle = styled.Text`
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 20px;
`;

const SignUpContainer = styled.View`
    align-items: center;
    justify-content: center;
    padding: 20px;
    flex-direction: row;
    width: 100%;

`;
const SignUpText = styled.Text`
    text-align: center;
    color: #777;

`;

const Link = styled.TouchableOpacity`
`;
const LinkTitle = styled.Text`
    font-weight: bold;
    color: #777;
    font-style: italic;
    text-decoration: underline;
`;


export const SC = {
    Container,
    Header,
    SubText,
    Button,
    Submit,
    RegisterRedirect,
    Status,
    TextInput,
    InputTitle,
    ButtonTitle,
    SignUpText,
    Link,
    LinkTitle,
    SignUpContainer,
};