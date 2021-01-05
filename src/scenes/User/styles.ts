import styled from 'styled-components/native'

const Container = styled.View`
    flex: 1;
`;

const Text = styled.Text`
    color: red;
`;

const Button = styled.TouchableOpacity`
    background-color: white;
    align-self: center;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 1px solid #3b5998;
    width: 90%;
    padding: 20px;
`
const ButtonTitle = styled.Text`
    font-weight: bold;
    color: #3b5998;
`;

const ScrollView = styled.ScrollView`
`;
const Link = styled.TouchableOpacity`
    flex-direction: row;
    width: 100%;
    align-items: center;
    background-color: white;
    margin-bottom: 8px;
`;

const IconContainer = styled.View`
    width: 10%;
    align-items: center;
    justify-content: center;
`;

const TitleContainer = styled.View`
    width: 80%;
    padding: 15px 10px;
`;

const TitleText = styled.Text`

`;
export const SC = {
    Container,
    Text,
    Button,
    ButtonTitle,
    ScrollView,
    Link,
    IconContainer,
    TitleContainer,
    TitleText,
};