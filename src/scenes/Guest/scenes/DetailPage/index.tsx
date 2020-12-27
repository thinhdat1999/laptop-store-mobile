import React, { useMemo, useState } from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useStore } from 'react-redux';
import CartButton from '../../../../components/CartButton';
import laptopApi from '../../../../services/api/laptopApi';
import cartService from '../../../../services/helper/cartService';
import { setMessage } from '../../../../services/redux/slices/messageSlice';
import CartConstants from '../../../../values/constants/CartConstants';
import ProductOverviewModel from '../../../../values/models/ProductSummaryModel';
import ContentBlock from './components/ContentBlock';
import ProductImages from './components/ProductImages';
import QuestionBlock from './components/QuestionBlock';
import RatingBlock from './components/RatingBlock';
import SpecInfo from './components/SpecInfo';
import SuggestBlock from './components/SuggestBlock';
import { SC } from './styles';


type ProductInfoStates = {
    image_ids: number[],
    productSpec: any,
    suggestions: ProductOverviewModel[],
    ratings: number[],
    loading: boolean,
}

const DetailPage = ({ route, navigation }: any) => {
    const { productId } = route.params;
    const dispatch = useDispatch();

    const store = useStore();


    const initialState = useMemo<ProductInfoStates>(() =>
    ({
        image_ids: [],
        productSpec: null,
        suggestions: [],
        ratings: [],
        loading: true,
    })
        , [])

    const [state, setState] = useState<ProductInfoStates>(initialState);

    const { image_ids, productSpec, suggestions, ratings, loading } = state;
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: null,
            headerRight: () => (
                <CartButton/>
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
                    productSpec: response.data["spec"],
                    suggestions: response.data["suggestions"],
                    ratings: response.data["rating_info"],
                    loading: false,
                }))
        }
        loadData();
    }, [])
    

    const addToCart = async () => {
        // @ts-ignore
        const cart = await cartService.getCart();
        const curItemQuantity = cart?.[productId] ?? 0;
        const curCartQuantity = cartService.getTotalQuantity();
        let message: string | null = null;

        if (curItemQuantity + 1 > CartConstants.MAX_QUANTITY_PER_ITEM) {
            message = `Tối đa ${CartConstants.MAX_QUANTITY_PER_ITEM} Laptop ${productSpec.name} trong giỏ hàng (hiện có: ${curItemQuantity})`;
        } else if (curCartQuantity + 1 > CartConstants.MAX_TOTAL_QUANTITY) {
            message = `Tổng số lượng sản phẩm trong giỏ hàng không được vượt quá ${CartConstants.MAX_TOTAL_QUANTITY} sản phẩm (hiện có: ${curCartQuantity})`;
        } else {
            await cartService.addItem(productSpec.id, 1);
            message = `Đã thêm Laptop ${productSpec.name} vào giỏ hàng (hiện có: ${
                curItemQuantity + 1
            })`;
        }
        store.dispatch(setMessage(message));
    };

    return (
        loading ? <SC.Text>Loading</SC.Text> :
            <SC.Container>
                <SC.Content>
                    <ProductImages key={productId} image_ids={image_ids} productSpec={productSpec} />
                    <ContentBlock title="Thông tin cơ bản" component={<SpecInfo key={productId} productSpec={productSpec} />} />
                    <ContentBlock title="Sản phẩm tương tự" component={<SuggestBlock key={productId} suggestions={suggestions} />} />
                    <ContentBlock title="Hỏi đáp về sản phẩm" component={<QuestionBlock key={productId} productId={productId}/>}/>
                    <ContentBlock title="Khách hàng nhận xét" component={<RatingBlock key={productId} productId={productId} ratingInfo = {ratings} ratingAvg = {productSpec.avg_rating} />}/>
                </SC.Content>
                <SC.ActionBar>
                    <SC.OrderButton onPress={() => {
                        addToCart();
                    }}><SC.OrderText>Chọn mua</SC.OrderText></SC.OrderButton>
                </SC.ActionBar>
            </SC.Container>
    );
}

export default DetailPage;