import React, { useMemo, useState } from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import laptopApi from '../../../../services/api/laptopApi';
import ProductOverviewModel from '../../../../values/models/ProductSummaryModel';
import ContentBlock from './components/ContentBlock';
import ProductImages from './components/ProductImages';
import SpecInfo from './components/SpecInfo';
import SuggestBlock from './components/SuggestBlock';
import { SC } from './styles';


type ProductInfoStates = {
    image_ids: number[],
    productSpec: any,
    suggestions: ProductOverviewModel[],
    loading: boolean,
}

const DetailPage = ({ route, navigation }: any) => {
    const { productId } = route.params;
    const dispatch = useDispatch();



    const initialState = useMemo<ProductInfoStates>(() =>
    ({
        image_ids: [],
        productSpec: null,
        suggestions: [],
        loading: true,
    })
        , [])

    const [state, setState] = useState<ProductInfoStates>(initialState);

    const { image_ids, productSpec, suggestions, loading } = state;
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
            console.log(response);
            setState((prev) => (
                {
                    ...prev,
                    image_ids: response.data["image_ids"],
                    productSpec: response.data["spec"],
                    suggestions: response.data["suggestions"],
                    loading: false,
                }))
        }
        loadData();
    }, [])


    return (
        loading ? <SC.Text>Loading</SC.Text> :
            <SC.Container>
                <SC.Content>
                    <ProductImages key={productId} image_ids={image_ids} productSpec={productSpec} />
                    <ContentBlock title="Thông tin cơ bản" component={<SpecInfo key={productId} productSpec={productSpec} />} />
                    <ContentBlock title="Sản phẩm tương tự" component={<SuggestBlock key={productId} suggestions={suggestions} />} />
                </SC.Content>
                <SC.ActionBar>
                    <SC.OrderButton><SC.OrderText>Chọn mua</SC.OrderText></SC.OrderButton>
                </SC.ActionBar>
            </SC.Container>
    );
}

export default DetailPage;