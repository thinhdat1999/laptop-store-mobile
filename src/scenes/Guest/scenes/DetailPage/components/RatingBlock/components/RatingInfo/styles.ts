import styled from 'styled-components/native';


const Container = styled.View`
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const LeftContainer = styled.View`
    align-items: center;
    width: 30%;
    border-right-color: #bbb;
    border-right-width: 1px;
`;

const RightContainer = styled.View`
    padding: 5px 10px;
    width: 70%;
    justify-content: center;
`;
const RatingAvg = styled.Text`
    font-size: 30px;
`;
const RatingQuantity = styled.Text`
    padding-left: 10px;
`;
const RatingCount = styled.Text``;

const InfoRow = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Progress = styled.View`
    height: 10px;
    margin-left: 10px;
    border-radius: 10px;
    background-color: grey;
    width: 60%;
`;
export const SC = {
    Container,
    LeftContainer,
    RightContainer,
    RatingQuantity,
    RatingAvg,
    RatingCount,
    InfoRow,
    Progress
}