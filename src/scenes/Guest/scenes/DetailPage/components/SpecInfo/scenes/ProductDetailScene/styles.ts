import styled from 'styled-components/native'

const Container = styled.ScrollView`
    background-color: white;
`;

const InfoRow = styled.View`
    display: flex;
    flex-direction: row;

    ${({isEven}) => !isEven && ` 
      background-color: #eee;
    `}
    padding: 15px;
`;

const Title = styled.Text`
    width: 25%;
    padding: 10px 5px;
    color: #aaa;
`;


const Content = styled.Text`
    width: 70%;
    padding: 10px 5px;
`;



export const SC = {
    Container,
    InfoRow,
    Title,
    Content,
}