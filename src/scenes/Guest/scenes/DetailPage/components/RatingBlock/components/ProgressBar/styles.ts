import styled from 'styled-components/native';

const Container = styled.View`
    width: 60%;
    height: 10px;
    border-radius: 10px;
    border: 1px solid #ddd;
    background-color: white;
    justify-content: center;
`;

const ProgressBar = styled.View`
    width: ${props => props.percent}%;
    background-color: ${props => props.color.toString()};
    height: 10px;
    border-radius: 10px;
    border: 2px solid ${props => props.color.toString()};
`;

export const SC = {
    Container, 
    ProgressBar,
}