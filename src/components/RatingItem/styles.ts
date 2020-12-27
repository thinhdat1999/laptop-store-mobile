import styled from 'styled-components/native'

const Container = styled.View`
    padding: 15px;
    background-color: white;
`;

const InfoRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.Text``;

const Date = styled.Text`
    color: #aaa;
`;

const Author = styled.Text`
    font-weight: bold;
    color: #BF081F;
`;

const Detail = styled.Text`
    padding-top: 10px;
`;
export const SC = {
    Container,
    InfoRow,
    Title,
    Date,
    Author,
    Detail,
}