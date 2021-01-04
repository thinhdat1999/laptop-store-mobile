import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    align-items: center;
    padding: 0;
    margin: 0 auto;
    justify-content: center;
    height: 100%;
`;


const Text = styled.Text`
    width: 100%;
`;

const ItemSpec = styled.Text`
    display: flex;
    font-weight: 600;
    font-size: 12px;
    color: #bbb;
    width: 100%;
`;

const ItemRating = styled.Text`
    color: darkorange;
    font-size: 14px;
`;
const Button = styled.Button``

const Item = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    max-width: 50%;
    border: solid 1px #eee;
    background-color: white;
    padding: -5px 3% 10px 3%;
    margin: 1.5px;

    /* border-bottom-right-radius: ${props => props.index % 2 === 0 ? 10: 0 }px;
    border-top-right-radius: ${props => props.index % 2 === 0 && props.index !== 0 ? 10: 0 }px;

    border-top-left-radius: ${props => props.index % 2 !== 0 && props.index !== 1 ? 10: 0 }px;
    border-bottom-left-radius: ${props => props.index % 2 !== 0 ? 10: 0 }px; */
`;

const UnitPrice = styled.Text`
    color: #bf081f;
    font-weight: bold;
    margin-right: 10px;
    text-decoration: underline;
`;

const OriginPrice = styled.Text`
    text-decoration: line-through;
    font-size: 13px;
    color: #777;
    text-decoration: line-through;
    font-weight: bold;
`;

const LoaderContainer = styled.View`
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const SC = {
    Container,
    LoaderContainer,
    Text,
    Button,
    Item,
    ItemSpec,
    ItemRating,
    OriginPrice,
    UnitPrice,
};