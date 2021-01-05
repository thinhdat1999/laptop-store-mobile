import styled from "styled-components/native";

const Container = styled.View`
    margin-bottom: 10px;
    background-color: white;
    padding: 10px;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

const BlockHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const ReceiverName = styled.Text`
    font-weight: bold;
    color: darkred;
    text-transform: uppercase;
`;

const Button = styled.TouchableOpacity`
    padding: 10px 5px;
    margin-right: 5px;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border: 1px solid #777;
    border-radius: 5px;
`;

const InfoRow = styled.View`
    margin-top: 10px;
    flex-direction: row;
    padding-right: 10px;
    width: 100%;
`;

const Title = styled.Text`
    font-weight: bold;
`;

const Info = styled.Text`
    color: #bbb;
    width: 90%;
`;
const AddressDefaultContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;
const AddressDefault = styled.Text`
    padding: 0px 10px;
    color: #007BFF;
    font-weight: bold;
`;


export const SC = {
    Container,
    ButtonContainer,
    BlockHeader,
    ReceiverName,
    Button,
    InfoRow,
    Title,
    Info,
    AddressDefaultContainer,
    AddressDefault,
}