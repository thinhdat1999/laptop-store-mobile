import React, { useEffect } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SC } from './styles';


const AddressModal = (props: any) => {

    const initialState = {
        items: props.items,
        filters: props.items,
    }

    const [state, setState] = React.useState(initialState);
    const {items, filters} = state;

    const searchItem = (value: string) => {
        setState((prev) =>({
            ...prev,
            filters: items.filter((i: any) => i.name.toLowerCase().includes(value.toLowerCase())),
        }));
    }

    useEffect(() => {
        setState(initialState);
    }, [props.visible])

    return (
        <SC.Modal visible={props.visible} transparent={true}>
            <SC.View>
                <SC.Container>
                    <SC.Header>
                        <SC.Title>{props.title}</SC.Title>
                        <SC.CloseButton onPress={() => props.closeModal()} >
                            <Icon name="close" size={25} color="#777" />
                        </SC.CloseButton>
                    </SC.Header>
                    <SC.Filter>
                        <SC.IconView>
                            <AntDesign name="search1" size={25} color="#777" />
                        </SC.IconView>
                        <SC.TextInputView>
                            <SC.FilterInput
                                onChangeText = {(value: string) => searchItem(value)}
                            ></SC.FilterInput>
                        </SC.TextInputView>
                    </SC.Filter>

                    <FlatList
                        data={Object.values(filters)}
                        keyExtractor={(item: any) => item.id.toString()}
                        renderItem={({ item, index }: any) => (
                            <SC.Item onPress={() => {props.select(item.id)}} index={index}>
                                <SC.ItemName>{item.name}</SC.ItemName>
                            </SC.Item>
                        )}
                    />

                </SC.Container>
            </SC.View>
        </SC.Modal>
    )
};

export default AddressModal;