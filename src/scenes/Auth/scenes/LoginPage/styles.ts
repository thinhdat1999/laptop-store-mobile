import { Field } from 'formik';
import styled from 'styled-components/native'

const Container = styled.View`
    flex: 1;
    alignItems: center;
`;

const Header = styled.Text`
    font-size: 30px;
    letter-spacing: 5px;
    margin-top: 30px;
    margin-bottom: 40%;
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
    color: red;
`;

const TextInput = styled.TextInput`
    font-size: 15px;
    width: 60%;
    border-radius: 5px;
    backgroundColor: #fffae3;
    borderRadius: 5px;
    height: 50px;
    margin-bottom: 20px;
    justifyContent: center;
    padding: 0;
`;

const RegisterRedirect = styled.View``;

const Button = styled.Button``

export const SC = {
    Container,
    Header,
    Button,
    Submit,
    RegisterRedirect,
    Status,
    TextInput
};