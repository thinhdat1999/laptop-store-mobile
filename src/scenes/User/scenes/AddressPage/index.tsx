import React from 'react';
import { userApi } from '../../../../services/api/userApi';
import { fireFetching, skipFetching } from '../../../../services/redux/slices/loaderStatusSlice';
import store from '../../../../services/redux/store';
import AddressModel from '../../../../values/models/AddressModel';
import { SC } from './styles';

const AddressPage = () => {
    const [addresses, setAddresses] = React.useState<AddressModel[] | null>(null);
    const userDefaultAddressId = React.useMemo(
        () => store.getState().user?.address_id,
        []
    );

    React.useEffect(() => {
        const loadData = async () => {
            store.dispatch(fireFetching());
            const response = await userApi.getCurrentUserAddresses();
            setAddresses(response.data);
            store.dispatch(skipFetching());
        };
        loadData();
    }, []);

    return (
        <SC.Container>
            <SC.Text>AddressPage</SC.Text>
            {addresses?.map((address) => (
                <SC.Text key={address.id}>{address["location"]}</SC.Text>)
            )}
        </SC.Container>
    );
}

export default AddressPage;