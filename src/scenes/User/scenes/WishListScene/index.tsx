import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../../../../services/api/userApi';
import { RootState } from '../../../../services/redux/rootReducer';
import { fireFetching, skipFetching } from '../../../../services/redux/slices/loaderStatusSlice';
import ProductOverviewModel from '../../../../values/models/ProductSummaryModel';
import WishlistItem from './components/WishlistItem';
import { SC } from './styles';

const WishListScene = ({ navigation, route }: any) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Xem sau",
        })
    }, [])

    const [items, setItems] = useState<ProductOverviewModel[] | null>(null);
    const wishList = useSelector((state: RootState) => state.wishList);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            if (!items) {
                dispatch(fireFetching());
            }
            const response = await userApi.getCurrentUserWishList();
            setItems(response.data);
            dispatch(skipFetching());
        };

        loadData();
    }, [wishList]);

    return items ? (
        <SC.Container>
            {
                items.length > 0 ? (
                    items.map((item) => <WishlistItem item={item} key={item.id} />)
                ) : null
            }
        </SC.Container>
    ) : null;
};

export default WishListScene;