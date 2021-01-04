import styled from 'styled-components/native'


const Title = styled.Text`
    width: 25%;
    padding: 10px 5px;
    color: grey;
`;


const Content = styled.Text`
    width: 70%;
    padding: 10px 5px;
`;

const NavigateButton = styled.TouchableOpacity`
    align-items: center;
    padding: 20px;
`;

const InfoRow = styled.View`
    display: flex;
    flex-direction: row;

    /* ${({isEven}) => !isEven && ` 
      background-color: #eee;
    `} */
    border-bottom-color: #eee;
    border-bottom-width: 1px;
    padding: 10px 15px;
`;

const Container = styled.View`
`;


export const SC = {
    InfoRow,
    Title,
    Content,
    NavigateButton,
    Container
};