import React, { useRef, useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { SC } from './styles';



const FullImageScene = ({ route, navigation }: any) => {

    const { images, activeIndex } = route.params;

    const [currentIndex, setIndex] = useState(0);

    const { width } = Dimensions.get("window");
    const height = width * 0.8;

    const scrollView = useRef();

    const change = ({ nativeEvent }: any) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== activeIndex) {
            setIndex(slide);

        }
    }

    React.useEffect(() => {
        scrollView.current.scrollTo({ x: width * activeIndex });
    }, [])

    return (
        <SC.Container>
            <SC.ScrollView
                pagingEnabled
                horizontal
                onScroll={change}
                showsHorizontalScrollIndicator={false}
                ref={(ref: any) => scrollView.current = ref}
            >
                {images.map((image: any, index: number) => (
                    <Image
                        key={index}
                        style={{
                            width: width,
                            height: height,
                            resizeMode: 'contain'
                        }}
                        source={{ uri: `https:/dnstore.codes` + image.original }}
                    />

                ))}
            </SC.ScrollView>
            <SC.Pagination pagingEnabled horizontal showsHorizontalScrollIndicator={false}>
                {images.map((i: any, k: number) => (
                    <SC.ThumbnailPicker
                        key={k}
                        activeOpacity={1}
                        onPress={() => { console.log("Test") }}
                    >
                        <SC.Thumbnail
                            source={{ uri: `https:/dnstore.codes` + i.thumbnail }}
                        />
                    </SC.ThumbnailPicker>

                ))}
            </SC.Pagination>
        </SC.Container>
    );
}

export default FullImageScene;