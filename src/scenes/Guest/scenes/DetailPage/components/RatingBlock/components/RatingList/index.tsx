import React from 'react';
import RatingItem from '../../../../../../../../components/RatingItem';
import ratingApi from '../../../../../../../../services/api/ratingApi';
import RatingModel from '../../../../../../../../values/models/RatingModel';
import { SC } from './styles';



type RatingListState = {
    loading: boolean;
    ratings: RatingModel[];
    count: number;
};

const RatingList = (props: any) => {

    const productId = props.productId;

    const initialState = React.useMemo<RatingListState>(
        () => ({
            loading: true,
            ratings: [],
            count: 0,
        }),
        []
    );
    const [state, setState] = React.useState<RatingListState>(initialState);
    const { ratings, count, loading } = state;


    React.useEffect(() => {
        const loadData = async () => {
            const response = await ratingApi.getByProductId(productId, 1);
            const count = parseInt(response.headers["x-total-count"]);
            if (count !== 0) {
                setState((prev) => ({
                    ...prev,
                    ratings: response.data,
                    loading: false,
                    count: count,
                }));
            }
        }
        loadData();
    }, [])


    return (
        <SC.Container>
            {(count !== 0 && !loading) ?
                (
                    ratings.length > 2 ? ratings.slice(0, 2).map((rating) => (
                        <RatingItem rating={rating} key={rating.id} />
                    )) : ratings.map((rating) => (
                        <RatingItem rating={rating} key={rating.id} />
                    ))
                )
                : null
            }
        </SC.Container>
    );
}

export default RatingList;