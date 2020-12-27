import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useStore } from 'react-redux';
import LoginPage from '../../../scenes/Auth/scenes/LoginPage';
import RegisterPage from '../../../scenes/Auth/scenes/RegisterPage';
import DetailPage from '../../../scenes/Guest/scenes/DetailPage';
import FullImageScene from '../../../scenes/Guest/scenes/DetailPage/components/ProductImages/scenes/FullImageScene';
import AllQuestionScene from '../../../scenes/Guest/scenes/DetailPage/components/QuestionBlock/scenes/AllQuestionScene';
import ReplyScene from '../../../scenes/Guest/scenes/DetailPage/components/QuestionBlock/scenes/ReplyScene';
import AllRatingScene from '../../../scenes/Guest/scenes/DetailPage/components/RatingBlock/scenes/AllRatingScene';
import ProductDetailScene from '../../../scenes/Guest/scenes/DetailPage/components/SpecInfo/scenes/ProductDetailScene';
import AddressPage from '../../../scenes/User/scenes/AddressPage';
import InfoPage from '../../../scenes/User/scenes/InfoPage';
import { userApi } from '../../../services/api/userApi';
import { setUser } from '../../../services/redux/slices/userSlice';
import UserModel from '../../../values/models/UserModel';
import MessageBox from '../../MessageBox';
import TabRoute from '../TabRoute';
import { SC } from './styles';

const Stack = createStackNavigator();
const AppRoute = () => {
  const store = useStore();

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const loadData = async () => {
      const token = await AsyncStorage.getItem("access_token");
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
          // store.dispatch(setWishList(JSON.parse(user?.wish_list ?? "[]")));
        } catch (err) {
          AsyncStorage.removeItem("access_token");
          AsyncStorage.removeItem("refresh_token");
        }
      }
      setLoading(false);
    }

    loadData();
  }, []);

  const guestScreens = {
    Detail: DetailPage,
    AllQuestion: AllQuestionScene,
    AllRating: AllRatingScene,
    ReplyScene: ReplyScene,
    ProductDetail: ProductDetailScene,
  };

  const authScreens = {
    Login: LoginPage,
    Register: RegisterPage,
  };

  const userScreens = {
    Info: InfoPage,
    Address: AddressPage,
  };

  return (
    loading ?
      <SC.Container>
        <ActivityIndicator size="large" color="black" />
      </SC.Container> :
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={TabRoute} 
          //  options={{
          //   headerShown: false,
          // }
          />
          {Object.entries({
            // Use the screens normally
            ...guestScreens,
            // Use some screens conditionally based on some condition
            ...userScreens,
            ...authScreens,
          }).map(([name, component]) => (
            <Stack.Screen key={name} name={name} component={component}/>
          ))}
          <Stack.Screen key="FullImage" name="FullImage" component={FullImageScene} options={{headerShown: false}} />
          {/* <Stack.Screen key="AllQuestion" name="AllQuestion" component={AllQuestionScene} /> */}
        </Stack.Navigator>
        <MessageBox/>
      </NavigationContainer>
    // <Stack.Navigator screenOptions={({ route }) => ({
    //     ...TransitionPresets.SlideFromRightIOS,
    //     headerTitle: title,
    // })}>
    //     <Stack.Screen name="Home" component={TabRoute} />
    //     <Stack.Screen name="Guest" component={GuestRoute} />
    //     <Stack.Screen name="User" component={UserRoute} />
    //     <Stack.Screen name="Auth" component={AuthRoute} />
    // </Stack.Navigator>

  );
}
export default AppRoute;