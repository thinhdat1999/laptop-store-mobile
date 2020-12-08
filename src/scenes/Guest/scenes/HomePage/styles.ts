import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    align-items: center;
    padding: 0;
    margin: 0 auto;
    justify-content: center;
`;


const Text = styled.Text`
    width: 100%;
`;

const ItemSpec = styled.Text`
    display: flex;
    font-weight: 600;
    color: #bbb;
    width: 100%;
`;

const ItemRating = styled.Text`
    color: darkorange;
`;
const Button = styled.Button``

const List = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    width: 50%;
    border: solid 1px #eee;
    background-color: white;
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


export const SC = {
    Container,
    Text,
    Button,
    List,
    ItemSpec,
    ItemRating,
    OriginPrice,
    UnitPrice,
};