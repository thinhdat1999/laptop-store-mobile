import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
`;

const ReceiverInfo = styled.Text`
    font-weight: bold;
`;

const AddressInfo = styled.Text`
    width: 90%;
`;

const AddressContainer = styled.View`
    padding: 10px;
`;
const LeftContainer = styled.View`
    width: 12%;
    padding: 10px;
`;

const RightContainer = styled.View`
    width: 88%;
    padding: 0px 10px;
`;

const AddressItem = styled.View`
    background-color: white;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom-width: ${props => props.final ? 0 : 1}px;
    border-bottom-color: ${props => props.final ? "white" : "#ddd"};
`;

const Picker = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`;
const PickerOuter = styled.View`
    border-radius: 50px;
    width: 25px;
    height: 25px;
    border: 1px solid #bbb;
    align-items: center;
    justify-content: center;
`;

const Choosen = styled.View`
    border-radius: 50px;
    width: 14px;
    height: 14px;
    background-color: blue;
`;

const AddressList = styled.ScrollView`
    height: 88%;
`;
const ActionBar = styled.View`
    height: 12%;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-top-color: #ccc;
    border-top-width: 1px;
`;

const Button = styled.TouchableOpacity`
    height: 40px;
    width: 90%;
    align-items: center;
    justify-content: center;
    background-color: red;
    border-radius: 5px;
`;

const ButtonTitle = styled.Text`
    font-weight: bold;
    color: white;
`;

export const SC = {
    Container,
    AddressContainer,
    AddressInfo,
    ReceiverInfo,
    LeftContainer,
    RightContainer,
    PickerOuter,
    AddressItem,
    Choosen,
    Picker,
    AddressList,
    ActionBar,
    Button,
    ButtonTitle
}