import styled from 'styled-components/native'



const ScrollView = styled.ScrollView`
    max-height: 320px;
    background-color: white;
`;

const Pagination = styled.Text`
    color: white;
    position: absolute;
    bottom: 10px;
    right: 10px;
    border-radius: 5px;
    background-color: grey;
    padding: 2px 5px;
    margin-top: 10px;
`;

export const SC = {
    Pagination,
    ScrollView,
};