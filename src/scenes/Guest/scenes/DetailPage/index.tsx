import React from 'react';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import laptopApi from '../../../../services/api/laptopApi';
import { setTitle } from '../../../../services/redux/slices/titleSlice';
import { SC } from './styles';


type DetailPageProps = {
    navigation: any
}

const DetailPage = ({ route, navigation }: any) => {
    console.log("DETAIL PAGE");
    const {id} = route.params;
    const dispatch = useDispatch();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Test Login",
            headerRight: () => (
                <Button
                    onPress={() => alert('This is a button!')}
                    title="Info"
                    color="#eee"
                />
            ),
        })
    }, [navigation])

    React.useEffect(() => {
        const loadData = async () => {
            const response = await laptopApi.getDetailById(id);
            console.log(id);
        }
        loadData();
    }, [])


    return (
        <SC.Container>
            <SC.Text>Detail Page</SC.Text>
            {/* <SC.Text>{ navigation.getParam()}</SC.Text> */}
        </SC.Container>
    );
}

export default DetailPage;