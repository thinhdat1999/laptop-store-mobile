import ProductOverviewModel from "../../../../../../values/models/ProductSummaryModel";
import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../services/redux/rootReducer";
import { fireLoading } from "../../../../../../services/redux/slices/loaderStatusSlice";
import { userApi } from "../../../../../../services/api/userApi";
import { removeWishListItem } from "../../../../../../services/redux/slices/wishListSlice";
import { SC } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { formatCurrency } from "../../../../../../services/helper/currency";
import { useNavigation } from "@react-navigation/native";


type WishListItemProps = {
    item: ProductOverviewModel;
};
const WishListItem = ({ item }: WishListItemProps) => {
    const wishList = useSelector((state: RootState) => state.wishList);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const removeItem = useCallback(async () => {
        dispatch(fireLoading());
        const listJSON = JSON.stringify(wishList.filter((id) => id !== item.id));
        await userApi.putCurrentUserWishList(listJSON);
        dispatch(removeWishListItem(item.id));
    }, []);

    return (
        <SC.Container>
            <SC.ScrollView>
                <SC.InfoContainer onPress={() => {
                    navigation.navigate("Detail", { productId: item.id })
                }}>
                    <SC.ImageContainer>
                        <SC.ItemImage
                            style={{
                                width: 80,
                                height: 80,
                            }}
                            source={{ uri: `https:/dnstore.codes/api/images/150/laptops/${item.id}/${item.alt}.jpg` }} />
                    </SC.ImageContainer>

                    <SC.ItemInfo>
                        <SC.ItemName>{item.name}</SC.ItemName>
                        <SC.DeleteButton onPress={removeItem}>
                            <EvilIcons name="close" size={20} color="#777" />
                        </SC.DeleteButton>
                        <SC.ItemSpec>
                            <SC.ItemRating>
                                {item["avg_rating"].toFixed(1)} <Icon name="star" size={10} color="darkorange" />
                            </SC.ItemRating>{" "}
                        - RAM {item["ram"]} - {item["hard_drive"]}
                        </SC.ItemSpec>
                        <SC.Price>
                            <SC.UnitPrice>
                                {formatCurrency(item["unit_price"])}đ
                        </SC.UnitPrice> - <SC.OriginPrice>
                                {formatCurrency(item["unit_price"] + item["discount_price"])}đ
                        </SC.OriginPrice>
                        </SC.Price>
                    </SC.ItemInfo>
                </SC.InfoContainer>
            </SC.ScrollView>

        </SC.Container>
    );
};

export default memo(WishListItem);