import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Rating } from 'react-native-ratings';
import { formatCurrency } from "../../../../../../services/helper/currency";
import { SC } from "./styles";

const ProductImages = (props: any) => {
    const imageIds = props.image_ids;
    const productId = props.productSpec["id"];
    const productAlt = props.productSpec["alt"];
    const price = props.productSpec["unit_price"];
    const re = /(\d)(?=(\d{3})+(?!\d))/g
    const [activeIndex, setIndex] = useState(0);

    const navigation = useNavigation();


    // const { productId, productAlt, imageIds } = useSelector((state: RootState) => {
    //     const spec = state.product?.spec;
    //     const imageIds = state.product?.image_ids ?? [];
    //     return {
    //         productId: spec?.id,
    //         productAlt: spec?.alt,
    //         imageIds: imageIds,
    //     };
    // });

    const { width } = Dimensions.get("window");
    const height = width * 0.8;
    const images = [
        {
            fullscreen: `/api/images/1000/laptops/${productId}/${productAlt}.jpg`,
            original: `/api/images/400/laptops/${productId}/${productAlt}.jpg`,
            thumbnail: `/api/images/150/laptops/${productId}/${productAlt}.jpg`,
            thumbnailClass: "thumbnail",
        },
    ].concat(
        imageIds.map((id: any) => ({
            fullscreen: `/api/images/1000/details/${id}/${productAlt}.jpg`,
            original: `/api/images/400/details/${id}/${productAlt}.jpg`,
            thumbnail: `/api/images/150/details/${id}/${productAlt}.jpg`,
            thumbnailClass: "thumbnail",
        }))
    );

    // React.useEffect(() => {
    // }, [])

    const change = ({ nativeEvent }: any) => {
        const slide = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== activeIndex) {
            setIndex(slide);

        }
    }
    return (
        <SC.Container>
            <SC.ScrollView
                pagingEnabled
                horizontal
                onScroll={change}
                showsHorizontalScrollIndicator={false}

            >
                {images.map((image, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={1}
                        onPress={() => navigation.navigate("FullImage", { images: images, activeIndex: activeIndex })}
                    >
                        <Image
                            style={{
                                width: width,
                                height: height,
                                resizeMode: 'contain'
                            }}
                            source={{ uri: `https:/dnstore.codes` + image.original }}
                        />
                    </TouchableOpacity>

                ))}
            </SC.ScrollView>
            <View>
                <SC.Pagination>
                    {activeIndex + 1}/{images.length}
                </SC.Pagination>
            </View>
            <SC.Text>{props.productSpec["name"]}</SC.Text>
            <SC.RatingContainer>
                <Rating
                    startingValue={props.productSpec["avg_rating"]}
                    type="star"
                    ratingColor="darkorange"
                    ratingBackgroundColor="gray"
                    readonly
                    imageSize={20}
                    //@ts-ignore
                    style={{ paddingVertical: 10, alignItems: "flex-start" }}
                />
                <Text> (Xem chi tiết đánh giá)</Text>
            </SC.RatingContainer>
            <SC.PriceContainer>
                <SC.UnitPrice>{formatCurrency(props.productSpec["unit_price"])} đ</SC.UnitPrice>
                <SC.OriginalPrice>{formatCurrency(props.productSpec["unit_price"] + props.productSpec["discount_price"])} đ</SC.OriginalPrice>
                <SC.DiscountPrice>-{(props.productSpec["discount_price"] / ((props.productSpec["unit_price"] + props.productSpec["discount_price"])) * 100).toFixed(1)}%</SC.DiscountPrice>
            </SC.PriceContainer>
            

        </SC.Container>

    );
};

export default ProductImages;