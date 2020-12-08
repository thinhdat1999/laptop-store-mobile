import React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SC } from './styles';

const HomeScreenHeader = () => {
    return (
        <SC.Header>
            <SC.Filter onPress={() => { alert("go to fiilter page") }}>
                <SC.SearchIcon name="search" size={25} color="#bbb" />
                <Text style={{ flex: 12 }}> Type something...</Text>
            </SC.Filter>

            <SC.CartButton onPress={() => alert('This is a button!')}>
                <Icon name="shopping-cart" size={30} color="#bbb" />
            </SC.CartButton>
        </SC.Header>
    );
}

export default HomeScreenHeader;