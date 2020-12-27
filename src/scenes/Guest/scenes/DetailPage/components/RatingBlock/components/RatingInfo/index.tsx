import React from 'react';
import { Rating } from 'react-native-ratings';
import ProgressBar from '../ProgressBar';
import { SC } from './styles';

const RatingInfo = (props: any) => {
    const avg = props.avg;
    const info = props.info;

    //@ts-ignore
    const ratingCount = info?.reduce((a, b) => a + b, 0) ?? 0;

    return (
        <SC.Container>
            <SC.LeftContainer>
                <SC.RatingAvg>{avg.toFixed(1)}/5</SC.RatingAvg>
                <Rating
                    startingValue={avg}
                    type="custom"
                    ratingColor="darkorange"
                    ratingBackgroundColor="grey"
                    readonly
                    imageSize={12}
                    //@ts-ignore
                    style={{ paddingVertical: 10, alignItems: "flex-start" }}
                />
                <SC.RatingCount>{ratingCount} đánh giá</SC.RatingCount>
            </SC.LeftContainer>
            <SC.RightContainer>
                {[5, 4, 3, 2, 1].map((star, index) => {
                    const count = info?.[5 - star] ?? 0;
                    const percent = ratingCount === 0 ? 0 : (count / ratingCount) * 100;
                    return (
                        <SC.InfoRow key={index}>
                            <Rating
                                startingValue={star}
                                type="custom"
                                ratingColor='darkorange'
                                ratingBackgroundColor='grey'
                                readonly
                                imageSize={12}
                                //@ts-ignore
                                style={{ paddingVertical: 5, paddingRight: 10}}
                            />
                            <ProgressBar percent={percent} />
                            <SC.RatingQuantity>{count}</SC.RatingQuantity>
                        </SC.InfoRow>

                    );
                })}
            </SC.RightContainer>
        </SC.Container>
    );
}

export default RatingInfo;