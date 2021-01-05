import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../../services/api/userApi';
import tokenHelper from '../../services/helper/tokenHelper';
import { RootState } from '../../services/redux/rootReducer';
import { setUser } from '../../services/redux/slices/userSlice';
import { setWishList } from '../../services/redux/slices/wishListSlice';
import store from '../../services/redux/store';
import UserModel from '../../values/models/UserModel';
import { SC } from './styles';



const UserPage = ({ navigation }: any) => {
    const [token, setToken] = React.useState<string | null>(null);

    //@ts-ignore
    const { user }: UserModel = useSelector((state: RootState) => {
        const user = state.user;
        return {
            user: user,
        }
    })

    const redirect = (screen: string) => {
        user ? navigation.navigate(screen) : navigation.push("Login");
    }

    const dispatch = useDispatch();

    // React.useEffect(() => {
    //     const loadData = async () => {
    //         // const token = await AsyncStorage.getItem("access_token");
    //         if(token !== null) {
    //             try {
    //                 alert("da dang nhap");
    //                 const response = await userApi.getCurrentUserInfo();
    //                 const user: UserModel = response.data;
    //                 dispatch(setUser(user));

    //                 if (user.cart) {
    //                   await AsyncStorage.setItem("cart", user.cart);
    //                 } else {
    //                   const cart = await AsyncStorage?.getItem("cart") ?? "{}";
    //                   await userApi.putCurrentUserCart(cart);
    //                 }
    //                 // store.dispatch(setWishList(JSON.parse(user?.wish_list ?? "[]")));
    //               } catch (err) {
    //                 AsyncStorage.removeItem("access_token");
    //                 AsyncStorage.removeItem("refresh_token");
    //               }
    //         }
    //     }
    // }, [])

    const getExpireDate = () => {
        const now = new Date();
        let expireTime = new Date(now);
        expireTime.setMinutes(now.getMinutes() - 1);
        return expireTime;
    }

    const reloadUser = async () => {
        const token = await tokenHelper.getToken();
        if (token !== null) {
            try {
                const response = await userApi.getCurrentUserInfo();
                const user: UserModel = response.data;
                store.dispatch(setUser(user));

                if (user.cart) {
                    await AsyncStorage.setItem("cart", user.cart);
                } else {
                    const cart = await AsyncStorage?.getItem("cart") ?? "{}";
                    await userApi.putCurrentUserCart(cart);
                }
                store.dispatch(setWishList(JSON.parse(user?.wish_list ?? "[]")));
            } catch (err) {
                AsyncStorage.removeItem("access_token");
                AsyncStorage.removeItem("refresh_token");
                throw err;
            }
        }
        else {
            store.dispatch(setUser(null));
        }
    }


    const logout = () => (
        Alert.alert(
            "Confirmation",
            "Xác nhận đăng xuất?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                    }
                },
                {
                    text: "OK", onPress: async () => {
                        try {
                            const token = await tokenHelper.getToken();
                            let access_token = JSON.stringify({
                                "access_token": token,
                                "expire_at": getExpireDate(),
                            });

                            await AsyncStorage.setItem('access_token', access_token);
                            await reloadUser();
                        } catch (err) {
                            alert("Lỗi");
                            throw err;
                        }
                    }
                }
            ],
            { cancelable: false }
        )
    );

    return (
        <SC.Container>
            <SC.ScrollView>
                <SC.Link onPress={() => redirect("Info")}>
                    <SC.IconContainer>
                        <Icon name="info-circle" size={25} color="#777" />
                    </SC.IconContainer>
                    <SC.TitleContainer>
                        <SC.TitleText>Thông tin người dùng</SC.TitleText>
                    </SC.TitleContainer>
                </SC.Link>
                <SC.Link onPress={() => redirect("Order")}>
                    <SC.IconContainer>
                        <Icon name="receipt" size={25} color="#777" />
                    </SC.IconContainer>
                    <SC.TitleContainer>
                        <SC.TitleText>Quản lý đơn hàng</SC.TitleText>
                    </SC.TitleContainer>
                </SC.Link>
                <SC.Link onPress={() => redirect("Address")}>
                    <SC.IconContainer>
                        <Icon name="address-book" size={25} color="#777" />
                    </SC.IconContainer>
                    <SC.TitleContainer>
                        <SC.TitleText>Sổ địa chỉ</SC.TitleText>
                    </SC.TitleContainer>
                </SC.Link>
                <SC.Link onPress={() => redirect("Wishlist")}>
                    <SC.IconContainer>
                        <Icon name="heart" size={25} color="#777" />
                    </SC.IconContainer>
                    <SC.TitleContainer>
                        <SC.TitleText>Xem sau</SC.TitleText>
                    </SC.TitleContainer>
                </SC.Link>
                {user ? <SC.Button onPress={logout}>
                    <SC.ButtonTitle>Đăng xuất</SC.ButtonTitle>
                </SC.Button> : null
                }

                {/* <SC.Button title="Go to Info" onPress={() => redirect("Info")}></SC.Button>
                <SC.Button title="Go to Address" onPress={() => redirect("Address")}></SC.Button>
                <SC.Button title="Go to Order" onPress={() => redirect("Order")}></SC.Button>
                <SC.Button title="Go to WishList" onPress={() => redirect("Wishlist")}></SC.Button> */}
            </SC.ScrollView>
        </SC.Container>
    );
}

export default UserPage;