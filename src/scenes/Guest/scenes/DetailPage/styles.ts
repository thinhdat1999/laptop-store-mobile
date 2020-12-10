import styled from 'styled-components/native'

const Container = styled.View`
    flex: 1;
    padding: 0;
    margin: 0 auto;
    align-items: center;
`;

const Text = styled.Text`
    color: red;
`;


const CartButton = styled.TouchableOpacity`
    padding: 15px;
`;

export const SC = {
    Container,
    Text,
    CartButton,
};