import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import laptopApi from '../../../../services/api/laptopApi';
import ProductOverviewModel from '../../../../values/models/ProductSummaryModel';
import { SC } from './styles';

type ItemListStates = {
    page: number;
    products: ProductOverviewModel[];
    loading: boolean;
    isDone: boolean;
    length: number;
}

const HomePage = ({ navigation, route }: any) => {
    const initialState = useMemo<ItemListStates>(() =>
        ({
            page: 1,
            products: [],
            loading: true,
            isDone: false,
            length: 0,
        })
        , [])

    const [state, setState] = React.useState<ItemListStates>(initialState);
    const { products, loading, page, isDone, length } = state;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Test Login",
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => alert('This is a button!')}
                >

                </TouchableOpacity>
            ),
        })
    }, [navigation, route])

    React.useEffect(() => {
        console.log(loading);
        if (!loading) return;
        const loadData = async () => {
            try {
                console.log("load data");
                const response = await laptopApi.getByCategory("latest", page);
                const newProducts = [...products, ...response.data];
                const length = parseInt(response.headers["x-total-count"]);
                setState((prev) => ({
                    ...prev,
                    products: newProducts,
                    loading: false,
                    isDone: newProducts.length === length,
                    length: length,
                }));
                console.log(products);
            } catch (err) {
                setState((prev) => ({
                    ...prev,
                    loading: false,
                }));
            }
        }
        loadData();
    }, [loading])

    const navigateToDetailScreen = (productId: number) => {
        navigation.navigate("Detail", { productId: productId });
    }

    return (
        <SC.Container>
            <FlatList
                numColumns={2}
                data={Object.values(products)}
                keyExtractor={(item) => item.id.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    console.log("reach");
                    if (!isDone && !loading) {
                        setState((prev) => ({
                            ...prev,
                            page: page + 1,
                            loading: true,
                        }))
                    }
                }}
                ListFooterComponent={() => loading ? <ActivityIndicator style={{ borderColor: "grey" }} /> : null}
                renderItem={({ item }) => (
                    <SC.List onPress={() => navigateToDetailScreen(item.id)}>
                        <Image
                            style={{
                                width: 150,
                                height: 150,
                            }}
                            source={{ uri: `https:/dnstore.codes/api/images/400/laptops/${item.id}/${item.alt}.jpg` }}
                        />
                        <SC.Text>{item.name}</SC.Text>
                        <SC.ItemSpec>
                            <SC.ItemRating>
                                <SC.Text>{item.avg_rating}</SC.Text>
                                <Icon name="star" size={20} />
                            </SC.ItemRating> {" "}
                            - RAM {item.ram} - {item.hard_drive}
                        </SC.ItemSpec>
                        <SC.Text>
                            <SC.UnitPrice>{item.unit_price.toLocaleString()}đ </SC.UnitPrice>
                         - <SC.OriginPrice>{item.discount_price.toLocaleString()}</SC.OriginPrice>đ
                        </SC.Text>
                    </SC.List>
                )}
            />
        </SC.Container>
    );
}

export default HomePage;