import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
import { formatCurrency } from '../../../../../../services/helper/currency';
import ProductOverviewModel from '../../../../../../values/models/ProductSummaryModel';
import { SC } from './styles';


const SuggestBlock = (props: any) => {

    const suggestions = props.suggestions;
    const navigation = useNavigation();
    React.useEffect(() => {
    }, [])

    const navigateToDetailScreen = (productId: number) => {
        navigation.push("Detail", { productId: productId });
    }


    return (
        <SC.Container>
            <SC.List
                horizontal
                data={Object.values(suggestions)}
                keyExtractor={(item : ProductOverviewModel) => item.id.toString()}
                renderItem={({ item } : any) => (
                    <SC.SuggestItem onPress = {() => {navigateToDetailScreen(item.id)}}>
                        <Image
                            style={{
                                width: 130,
                                height: 130,
                                alignSelf: "center",
                                resizeMode: "contain"
                            }}
                            source={{ uri: `https:/dnstore.codes/api/images/400/laptops/${item.id}/${item.alt}.jpg` }}
                        />
                        <SC.Text numberOfLines={2}>{item.name}</SC.Text>
                        <SC.Text><SC.UnitPrice>{formatCurrency(item.unit_price)}đ </SC.UnitPrice>
                         - <SC.OriginPrice>{(item.discount_price / ((item.unit_price + item.discount_price)) * 100).toFixed(1)}%</SC.OriginPrice>
                    
                        </SC.Text>
                    </SC.SuggestItem>
                )}
            />
        </SC.Container>
    );

}

export default SuggestBlock;