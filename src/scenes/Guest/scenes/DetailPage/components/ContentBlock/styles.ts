import styled from 'styled-components/native'

const Section = styled.View`
    margin-top: 30px;
    /* :not(:last-of-type) {
        margin-bottom: 30px;
    } */
    background-color: white;
`;

const Header = styled.Text`
    /* margin-bottom: 5px; */
    font-size: 18px;
    font-weight: bold;
    padding: 10px 15px;
`;

export const SC = {
    Section,
    Header,
};
