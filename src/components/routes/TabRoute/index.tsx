import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import React from 'react';
import { Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomePage from "../../../scenes/Guest/scenes/HomePage";
import UserPage from "../../../scenes/User";
import { SC } from "./styles";

const Tab = createBottomTabNavigator();

const TabRoute = ({ navigation, route }: any) => {
  const getHeader = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

    switch (routeName) {
      case 'Home':
        return {
          headerRight: () => (
            <SC.CartButton onPress={() => alert('This is a button!')}>
              <Icon name="shopping-cart" size={30} color="#bbb" />
            </SC.CartButton>
          ),
          headerTitle: () => (
            <SC.Filter onPress={() => {alert("test")}} >
              <SC.SearchIcon name="search" size={25} color="#bbb" />
              <Text style={{ flex: 12 }}> Type something...</Text>
            </SC.Filter>
          ),
        }
      case "UserPage":
        return {
          headerTitle: "User",
          headerRight: null,
        };
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions(getHeader(route));
  }, [navigation, route]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="UserPage" component={UserPage} />
    </Tab.Navigator>
  );
}
export default TabRoute;