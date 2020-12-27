import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import RatingItem from '../../../../../../../../components/RatingItem';
import ratingApi from '../../../../../../../../services/api/ratingApi';
import RatingModel from '../../../../../../../../values/models/RatingModel';
import RatingInfo from '../../components/RatingInfo';
import { SC } from './styles'


type ItemListStates = {
    page: number;
    ratings: RatingModel[];
    loading: boolean;
    isDone: boolean;
    length: number;
}

const AllRatingScene = ({ navigation, route }: any) => {

    const { productId, avg, info } = route.params;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Đánh giá về sản phẩm",
        })
    }, [])

    const initialState = useMemo<ItemListStates>(() =>
    ({
        page: 1,
        ratings: [],
        loading: true,
        isDone: false,
        length: 0,
    })
        , [])
    const [state, setState] = React.useState<ItemListStates>(initialState);

    const { page, ratings, loading, isDone, length } = state;

    React.useEffect(() => {
        if (!loading) return;
        const loadData = async () => {
            try {
                const response = await ratingApi.getByProductId(productId, page);
                const newRatings = [...ratings, ...response.data];
                const count = parseInt(response.headers["x-total-count"]);
                setState((prev) => ({
                    ...prev,
                    ratings: newRatings,
                    loading: false,
                    isDone: length === count,
                    length: newRatings.length,
                }));
            } catch (err) {
                setState((prev) => ({
                    ...prev,
                    loading: false,
                }));
            }
        }
        loadData();
    }, [loading])


    return (
        <SC.Container>
            <FlatList
                data={Object.values(ratings)}
                keyExtractor={(item) => item.id.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (!isDone && !loading) {
                        setState((prev) => ({
                            ...prev,
                            page: page + 1,
                            loading: true,
                        }))
                    }
                }}
                ListHeaderComponent={() => <RatingInfo key={productId} avg={avg} info={info} />}
                ListHeaderComponentStyle={{
                    backgroundColor: "white",
                    marginBottom: 15,
                }}
                ListFooterComponent={() => loading
                    ? <ActivityIndicator size="large" color="black" />
                    : isDone ?
                        <SC.EndListMessage> Bạn đã xem hết đánh giá</SC.EndListMessage> : null}
                renderItem={({ item }) => (
                    <>
                        <RatingItem rating={item} key={item.id} />
                    </>
                )}
                ListFooterComponentStyle={{
                    backgroundColor: "white",
                }}
                style={{
                    backgroundColor: "#ddd",
                }}
            />
        </SC.Container>
    );
}

export default AllRatingScene;