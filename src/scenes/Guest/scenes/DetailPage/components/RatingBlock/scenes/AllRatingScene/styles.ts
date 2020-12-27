import styled from 'styled-components/native'

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: white;
`;

const EndListMessage = styled.Text`
    padding: 15px;
    border-top-color: #ddd;
    border-top-width: 1px;
    width: 100%;
    align-self: center;
    text-align: center;
    color: #bbb;
`;


export const SC = {
    Container,
    EndListMessage,
}