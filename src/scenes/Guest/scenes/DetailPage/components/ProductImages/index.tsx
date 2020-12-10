import React, { useState } from "react";
import ReactImageGallery from "react-image-gallery";
import { SC } from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../services/redux/rootReducer";
import { Dimensions, Image, NativeScrollEvent, Text, View } from "react-native";
import { ScrollView, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const ProductImages = (props: any) => {
    const imageIds = props.image_ids;
    const productId = props.productId;
    const productAlt = props.productAlt;

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

    React.useEffect(() => {
        console.log(imageIds);
        console.log(productAlt);

    }, [])

    const change = ({ nativeEvent } : any) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== activeIndex) {
            setIndex(slide);

        }
    }
    return (
        <View>
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
                        onPress={() => navigation.navigate("FullImage", {images: images, activeIndex: activeIndex})}
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
        </View>

    );
};

export default ProductImages;