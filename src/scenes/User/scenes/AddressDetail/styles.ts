import styled from "styled-components/native";


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

const SelectField = styled.TouchableOpacity`
    width: 100%;
    padding: 10px 0px;
    border-bottom-width: 1px;
    border-bottom-color: blue;
`;
const SelectView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const SelectInput = styled.Text`
    background-color: white;
    width: 90%;
`; 

const ButtonContainer = styled.View`
    display: flex;
    margin-left: 110px;
`;

const SubmitButton = styled.TouchableOpacity`
    border: none;
    background-color: #5cb85c;
    color: white;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 0;
    width: 200px;
    border-radius: 5px;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;


const AddressButton = styled.TouchableOpacity`
    border: none;
    background-color: #0062cc;
    color: white;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 0;
    width: 200px;
    border-radius: 5px;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
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


const ModalView = styled.View`
    background-color: pink;
    height: 60%;
    width: 80%;
    justify-content: center;
    align-items: center;
    padding: 30px;
`;

const ValidationContainer = styled.View`

`;

const ValidationText = styled.Text`
    color: red;
`;

const DefaultAddress =styled.View`
    flex-direction: row;
    width: 100%;
`;

const DefaultAddressCheckBoxContainer = styled.View`
    width: 10%;
`;

const DefaultAddressText = styled.Text`
    width: 90%;
`;
export const SC = {
    Container,
    Form,
    InputContainer,
    InputField,
    InputTitle,
    ButtonContainer,
    SubmitButton,
    AddressButton,
    ActionBar,
    Button,
    ButtonTitle,
    SelectField,
    SelectView,
    SelectInput,
    ModalView,
    ValidationContainer,
    ValidationText,
    DefaultAddress,
    DefaultAddressCheckBoxContainer,
    DefaultAddressText,
};