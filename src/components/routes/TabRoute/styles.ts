import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native'

const Filter = styled.TouchableOpacity`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 5px;
    border: 1px solid grey;
`;

const SearchIcon = styled(Icon)`
    flex: 1;
    padding-left: 15px;
    padding-right: 5px;
`;

export const SC = {
    Filter,
    SearchIcon,
};