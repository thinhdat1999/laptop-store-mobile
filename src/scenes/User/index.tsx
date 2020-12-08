import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/redux/rootReducer';
import UserModel from '../../values/models/UserModel';
import { SC } from './styles';



const UserPage = ({ navigation }: any) => {
    const [token, setToken] = React.useState<string | null>(null);

    //@ts-ignore
    const {user} : UserModel = useSelector((state: RootState) => {
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
    //                 console.log(token);
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

    return (
        <SC.Container>
            <SC.Text>User Page</SC.Text>
            <SC.Button title="Go to Info" onPress={() => redirect("Info")}></SC.Button>
            <SC.Button title="Go to Address" onPress={() => redirect("Address")}></SC.Button>
        </SC.Container>
    );
}

export default UserPage;