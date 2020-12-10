import React, { useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import laptopApi from '../../../../services/api/laptopApi';
import ProductImages from './components/ProductImages';
import { SC } from './styles';


type ProductInfoStates = {
    image_ids: number[],
    productAlt: string,
    loading: boolean,
}

const DetailPage = ({ route, navigation }: any) => {
    const { productId } = route.params;
    const dispatch = useDispatch();



    const initialState = useMemo<ProductInfoStates>(() =>
        ({
            image_ids: [],
            productAlt: "",
            loading: true,
        })
        , [])

    const [state, setState] = useState<ProductInfoStates>(initialState);

    const { image_ids, productAlt, loading } = state;
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: null,
            headerRight: () => (
                <SC.CartButton onPress={() => alert('This is a button!')}>
                    <Icon name="shopping-cart" size={30} color="#bbb" />
                </SC.CartButton>
            ),
        })
    }, [navigation])

    React.useEffect(() => {
        const loadData = async () => {
            const response = await laptopApi.getDetailById(productId);
            setState((prev) => (
                {
                    ...prev,
                    image_ids: response.data["image_ids"],
                    productAlt: response.data["spec"]["alt"],
                    loading: false,
                }))
        }
        loadData();
    }, [])


    return (
        loading ? <SC.Text>Loading</SC.Text> :
        <SC.Container>
            <ProductImages key={productId} image_ids={image_ids} productId = {productId} productAlt = {productAlt} />
            <SC.Text>Another block</SC.Text>
        </SC.Container>
    );
}

export default DetailPage;