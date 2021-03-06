import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import React from 'react';
import { Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomePage from "../../../scenes/Guest/scenes/HomePage";
import UserPage from "../../../scenes/User";
import CartButton from "../../CartButton";
import { SC } from "./styles";

const Tab = createBottomTabNavigator();

const TabRoute = ({ navigation, route }: any) => {
  const getHeader = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

    switch (routeName) {
      case 'Home':
        return {
          headerRight: () => (
            <CartButton/>
          ),
          headerTitle: () => (
            <SC.Filter onPress={() => {alert("test")}} >
              <SC.SearchIcon name="search" size={20} color="#bbb" />
              <Text style={{ flex: 12 }}> Type something...</Text>
            </SC.Filter>
          ),
          headerTitleStyle: {
            justifyContent: "center",
            alignItems: "center",
          }
        }
      case "UserPage":
        return {
          headerTitle: "Cá nhân",
          headerRight: () => (
            <CartButton/>
          ),
        };
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions(getHeader(route));
  }, [navigation, route]);

  return (
    <Tab.Navigator tabBarOptions={{
      inactiveTintColor: "#e2dada",
      activeTintColor: "#000",
    }}>
      <Tab.Screen name="Home" component={HomePage} options={{
        tabBarLabel: "Trang chủ",
        tabBarIcon: () => <Entypo name="home" color="black" size={20}/>,
      }}/>
      <Tab.Screen name="UserPage" component={UserPage} options={{
        tabBarLabel: "Cá nhân",
        tabBarIcon: () => <AntDesign name="user" color="black" size={20}/>,
      }} />
    </Tab.Navigator>
  );
}
export default TabRoute;