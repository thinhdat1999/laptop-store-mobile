import styled from 'styled-components/native';

const Container = styled.View`
    padding: 10px;
`;

const OrderNo = styled.Text`
    color: #bf081f;
    font-weight: bold;
    font-size: 16px;
`;

const InfoRow = styled.View`
    flex-direction: row;
    width: 100%;
`;

const Title = styled.Text`
    font-weight: bold;
    width: 25%;
`;

const Info = styled.Text`
    width: 75%;
`;

const Detail = styled.Text`
    width: 75%;
`;

const SectionContainer = styled.View`
    padding: 10px;
    background-color: white;
    margin-bottom: 10px;
    border-radius: 5px;
`;

const SectionHeader = styled.View`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

const OverviewContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const ActionBar = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Button = styled.TouchableOpacity`
    padding: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
`;

const ButtonTitle = styled.Text`
    font-weight: bold;
    color: #777;
`;

export const SC = {
    Container,
    OrderNo,
    InfoRow,
    Title,
    Info,
    SectionContainer,
    SectionHeader,
    ActionBar,
    OverviewContainer,
    Detail,
    Button,
    ButtonTitle,
}