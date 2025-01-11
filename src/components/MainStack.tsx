import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";

import { SplashScreen } from "./SplashScreen";
import { HomeScreen } from "./HomeScreen";
import { SearchScreen } from "./SearchScreen";
import { DetailsScreen } from "./DetailsScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Splash"
            screenOptions={{
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
            />
            <StackNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "TV Shows" }}
            />
            <StackNavigator.Screen
                name="Search"
                component={SearchScreen}
                options={{ title: "Search Shows" }}
            />
            <StackNavigator.Screen
                name="Details"
                component={DetailsScreen}
                options={{ title: "Show Details" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);