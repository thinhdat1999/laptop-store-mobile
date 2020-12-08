import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/FontAwesome';
const Header = styled.View`
    height: 15%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
const CartButton = styled.TouchableOpacity`
    flex: 1;
    padding: 15px;
`;

const Filter = styled.TouchableOpacity`
    flex: 9;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    height: 40%;
    border: 1px solid grey;
    margin: 15px 0 15px 15px;
`;

const SearchIcon = styled(Icon)`
    flex: 1;
    padding-left: 15px;
    padding-right: 5px;
`;

export const SC = {
    Header,
    Filter,
    CartButton,
    SearchIcon,
};