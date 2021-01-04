import styled from 'styled-components/native';


const Container = styled.View`
    background-color: white;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const Title = styled.Text`
    padding: 15px;
`;

const Button = styled.TouchableOpacity`
    padding: 10px;
    background-color: #777;
    height: 40px;
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
    Title,
    Button,
    ButtonTitle,
}