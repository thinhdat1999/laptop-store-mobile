import styled from 'styled-components/native';

const Container = styled.View`
    margin-bottom: 20px;
`;

const List = styled.FlatList`

`;

const SuggestItem = styled.TouchableOpacity`
    width: 150px;
    margin-right: 15px;
`;

const Text = styled.Text`
    padding-left: 15px;
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
    List,
    Text,
    UnitPrice,
    OriginPrice,
    SuggestItem,
};