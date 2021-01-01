import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import ratingApi from '../../../../../../services/api/ratingApi';
import RatingModel from '../../../../../../values/models/RatingModel';
import RatingInfo from './components/RatingInfo';
import RatingList from './components/RatingList';
import { SC } from './styles';




const RatingBlock = (props: any) => {
    const productId = props.productId;
    const ratingInfo = props.ratingInfo;
    const ratingAvg = props.ratingAvg;


    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);

    return (
        loading ?
        <SC.Container>
            <SC.AllRatingButton onPress={() => {
                navigation.navigate("AllRating", { productId: productId, avg: ratingAvg, info: ratingInfo });
            }}>
                <SC.AllRatingButtonTitle>Xem tất cả</SC.AllRatingButtonTitle>
            </SC.AllRatingButton>

            <RatingInfo key={productId} avg={ratingAvg} info={ratingInfo} />
            <RatingList productId={productId} setLoading = {setLoading} />
        </SC.Container> : null
    );
}

export default RatingBlock;