import styled from 'styled-components/native'

const Container = styled.View`
    flex: 1;
    padding: 0;
    margin: 0 auto;
    /* align-items: center; */
`;

const Content = styled.ScrollView`
    flex: 1;
    padding: 0;
    margin: 0 auto;
`;

const Text = styled.Text`
    color: red;
`;


const CartButton = styled.TouchableOpacity`
    padding: 15px;
`;

const ActionBar = styled.View`
    align-items: center;
    height: 8%;
    justify-content: center;
    background-color: #fff;
    border-top-color: #eee;
    border-top-width: 2px;
`;

const OrderButton = styled.TouchableOpacity`
    margin-top: 15px;
    margin-bottom: 10px;
    color: red;
    background-color: red;
    border-radius: 5px;
    width: 90%;
    height: 70%;
    align-items: center;
    justify-content: center;
`;

const OrderText = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 16px;
`;

export const SC = {
    Container,
    Text,
    CartButton,
    Content,
    ActionBar,
    OrderButton,
    OrderText,
};