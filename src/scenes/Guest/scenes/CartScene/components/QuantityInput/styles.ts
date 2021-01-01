import styled from 'styled-components/native';

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

const DecreaseButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 15%;
    height: 40px;
    border: 1px solid #bbb;
    background-color: #eee;

`;

const IncreaseButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 15%;
    height: 40px;
    border: 1px solid #bbb;
    background-color: #eee;
`;

const DecreaseButtonTitle = styled.Text`

`;

const IncreaseButtonTitle = styled.Text`

`;

const QuantityInput = styled.TextInput`
    text-align: center;
    width: 20%;
    height: 40px;
    border-top-color: #bbb;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-bottom-color: #bbb;
`;

const QuantityInputContainer = styled.View`
    flex-direction: row;
    padding: 10px;
    width: 100%; // 90% if have some btn on the right
`;
const WishlistButton = styled.TouchableOpacity`
`;

export const SC = {
    Container,
    DecreaseButton,
    IncreaseButton,
    DecreaseButtonTitle,
    IncreaseButtonTitle,
    QuantityInput,
    WishlistButton,
    QuantityInputContainer
}