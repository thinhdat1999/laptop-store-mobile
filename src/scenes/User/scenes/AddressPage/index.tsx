import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { userApi } from '../../../../services/api/userApi';
import { RootState } from '../../../../services/redux/rootReducer';
import { fireFetching, skipFetching } from '../../../../services/redux/slices/loaderStatusSlice';
import store from '../../../../services/redux/store';
import AddressModel from '../../../../values/models/AddressModel';
import AddressBlock from './components/AddressBlock';
import { SC } from './styles';



const AddressPage = () => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Sổ địa chỉ",
        })
    }, [])

    const [addresses, setAddresses] = React.useState<AddressModel[] | null>(null);
    const navigation = useNavigation();
    const userDefaultAddressId = React.useMemo(
        () => store.getState().user?.address_id,
        []
    );

    const loading = useSelector((state: RootState) => state.loaderStatus.isLoading);

    const loadData = async () => {
        store.dispatch(fireFetching());
        const response = await userApi.getCurrentUserAddresses();
        setAddresses(response.data);
        store.dispatch(skipFetching());
    };

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          loadData();
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);

    return (
        loading ? <ActivityIndicator size="large" color="black"/> :
        <SC.Container>
            <SC.ScrollView>
                {addresses?.map((address) => (
                    <AddressBlock key={address.id}
                        address={address}
                        isDefaultAddress={address.id === userDefaultAddressId}
                        reload={loadData}
                    />)
                )}
            </SC.ScrollView>
            <SC.ActionBar>
                <SC.Button onPress={() => {
                    navigation.navigate("CreateAddress", {addressId: null});
                }}>
                    <SC.ButtonTitle>Thêm địa chỉ mới</SC.ButtonTitle>
                </SC.Button>
            </SC.ActionBar>
        </SC.Container>
    );
}

export default AddressPage;