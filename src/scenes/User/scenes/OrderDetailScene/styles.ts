import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
`;

const ScrollView = styled.ScrollView`
    height: 80%;
`;

const SectionContainer = styled.View`
    padding: 10px;
    background-color: white;
    margin-bottom: 10px;
    border-radius: 5px;
    flex-direction: row;
`;

const SectionHeader = styled.View`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

const SectionTitle = styled.Text`
    font-size: 16px;
`;

const ReceiverInfo = styled.Text`
    font-weight: bold;
`;

const AddressInfo = styled.Text`
    width: 90%;
`;

const AddressContainer = styled.View`
`;

const OrderDate = styled.Text`
    color: #777;
    font-size: 13px;
`;
const DeliveryDate = styled.Text`
    color: #777;
`;
const Total = styled.Text`
    color: red;
`;

const LeftContainer = styled.View`
    width: 10%;
    padding: 0px 5px;
`;

const RightContainer = styled.View`
    width: 90%;
    padding: 0px 5px;
`;

const Header = styled.View`
    flex-direction: row;
    padding: 10px;
`;

const ItemContainer = styled.View`
    background-color: white;
    margin-bottom: 10px;
`;

const ActionBar = styled.View`
    height: 15%;
    align-items:center;
    justify-content: center;
    background-color: white;
    border-top-width: 1px;
    border-top-color: #bbb;
`;

const Button = styled.TouchableOpacity`
    padding: 10px;
    background-color: red;
    height: 50px;
    width: 90%;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

const ButtonTitle = styled.Text`
    font-weight: bold;
    color: white;
`;

export const SC = {
    Container,
    ScrollView,
    SectionContainer,
    Header,
    SectionHeader,
    SectionTitle,
    ReceiverInfo,
    AddressInfo,
    AddressContainer,
    OrderDate,
    DeliveryDate,
    Total,
    LeftContainer,
    RightContainer,
    ItemContainer,
    ActionBar,
    Button,
    ButtonTitle,

}