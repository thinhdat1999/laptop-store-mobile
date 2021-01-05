import styled from 'styled-components/native';

const Modal = styled.Modal`
    border: 1px solid #f2f2f2;
    align-self: center;
`;

const View = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #000000aa;
`;

const Container = styled.View`
    width: 90%;
    height: 90%;
    padding: 10px;
    background-color: white;
`;

const Header = styled.View`
    flex-direction: row;
    align-items:center;
    justify-content: space-between;
`;

const Title = styled.Text`
    font-size: 18px;
`;

const CloseButton = styled.TouchableOpacity`

`;

const Filter = styled.View`
    margin-top: 10px;
    flex-direction: row;
    width: 100%;
    align-items: center;
    border-radius: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #777;
`;
const IconView = styled.View`
    width: 10%;
    /* border-right-width: 1px;
    border-right-color: #777; */
    justify-content: center;
    align-items: center;
`;
const TextInputView = styled.View`
    width: 90%;
    padding: 10px;
`;

const FilterInput = styled.TextInput`
    /* border-bottom-width: 1px;
    border-bottom-color: #777; */
`;

const Item = styled.TouchableOpacity`
    width: 100%;
    height: 35px;
    padding: 25px 10px;
    margin-top: 10px;
    justify-content: center;
`;

const ItemName = styled.Text`

`;

export const SC = {
    Modal,
    Container,
    View,
    Header, 
    CloseButton,
    Title,

    Filter,
    IconView,
    TextInputView,
    FilterInput,

    Item,
    ItemName,
};