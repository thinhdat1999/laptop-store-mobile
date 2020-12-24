import React, { useRef, useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { SC } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';


const FullImageScene = ({ route, navigation }: any) => {

    const { images, activeIndex } = route.params;

    const [currentIndex, setIndex] = useState(activeIndex);

    const { width } = Dimensions.get("window");
    const height = width * 0.8;

    const scrollView = useRef();
    const scrollView2 = useRef();

    const change = ({ nativeEvent }: any) => {
        const slide = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== currentIndex) {
            setIndex(slide);
        }
    }

    React.useEffect(() => {
        scrollView.current.scrollTo({ x: width * currentIndex });
        scrollView2.current.scrollTo({ x: 80 * currentIndex });
    }, [])

    React.useEffect(() => {
        scrollView2.current.scrollTo({ x: 80 * currentIndex });
    }, [currentIndex])



    return (
        <SC.Container>
            <SC.BackButton
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Icon name="close" size={30} color="grey"/>
            </SC.BackButton>
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
            <SC.Pagination
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                ref={(ref: any) => scrollView2.current = ref}
            >
                {images.map((i: any, k: number) => (
                    <SC.ThumbnailPicker
                        key={k}
                        activeOpacity={1}
                        onPress={() => {
                            scrollView2.current.scrollTo({ x: k * 60 });
                            scrollView.current.scrollTo({ x: width * k });
                        }}
                        active={currentIndex === k ? true : false}
                    >
                        <SC.Thumbnail
                            active={currentIndex === k ? true : false}
                            source={{ uri: `https:/dnstore.codes` + i.thumbnail }}
                        />
                    </SC.ThumbnailPicker>

                ))}
            </SC.Pagination>
        </SC.Container>
    );
}

export default FullImageScene;