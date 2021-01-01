import React from 'react';
import { Rating } from 'react-native-ratings';
import { SC } from './styles';

const RatingItem = (props: any) => {

    const rating = props.rating;

    return (
        <SC.Container>
            <SC.InfoRow>
                <Rating
                    startingValue={rating.point}
                    type="custom"
                    ratingColor='darkorange'
                    ratingBackgroundColor='grey'
                    readonly
                    imageSize={22}
                    //@ts-ignore
                    style={{ paddingVertical: 5, paddingRight: 10 }}
                />
                <SC.Date>{rating.created_at}</SC.Date>
            </SC.InfoRow>
            <SC.Author>{rating.author_name}</SC.Author>
            <SC.Detail>{rating.detail}</SC.Detail>
        </SC.Container>
    );
}

export default RatingItem;