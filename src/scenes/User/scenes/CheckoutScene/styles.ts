import styled from 'styled-components/native'

const Container = styled.View`
    flex: 1;
`;

const SectionContainer = styled.View`
    padding: 10px;
    background-color: white;
    margin-bottom: 10px;
`;

const SectionHeader = styled.View`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 10px;
`;

const Button = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
`;

const ButtonTitle = styled.Text`
    color: #57A0D3;
    font-weight: bold;
`;

const SectionHeaderTitle = styled.Text`
    font-weight: bold;
    color: black;
`;

const ItemList = styled.View`
    background-color: white;
    display: flex;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 10px;
`;

const InfoRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    align-items: center;
`;

const LeftText = styled.Text`
    font-weight: bold;
`;

const RightText = styled.Text`
    font-size: ${props => props.total ? 16 : 14}px;
`;

const Content = styled.ScrollView`
    height: 85%;
`;

const SummaryContainer = styled.View`
    background-color: white;
    padding: 10px;
    height: 15%;
    
    align-items: center;
    border-top-color: #bbb;
    border-top-width: 1px;
`;

const CheckoutButton = styled.TouchableOpacity`
    padding: 10px;
    background-color: #D9534F;
    height: 40px;
    width: 94%;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

const CheckoutButtonTitle = styled.Text`
    font-weight: bold;
    color: white;
`;

export const SC = {
    Container,
    SectionContainer,
    SectionHeader,
    Button,
    ButtonTitle,
    SectionHeaderTitle,
    ItemList,
    InfoRow,
    LeftText,
    RightText,
    Content,
    SummaryContainer,
    CheckoutButton,
    CheckoutButtonTitle
}