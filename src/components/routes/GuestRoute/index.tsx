import React from 'react';
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import HomePage from "../../../scenes/Guest/scenes/HomePage";
import DetailPage from '../../../scenes/Guest/scenes/DetailPage';
import Icon from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();

const GuestRoute = () => {
    console.log("GUEST ROUTE");

    return (
        <Stack.Navigator
            screenOptions = {{
                gestureEnabled: true,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Detail" component={DetailPage} />
        </Stack.Navigator>
    );
}
export default GuestRoute;