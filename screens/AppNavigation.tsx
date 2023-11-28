import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';

import HomeScreen from './HomeScreen';
import ProfileChangeScreen from './ProfileChangeScreen';
import ProfileScreen from './ProfileScreen';

type RootStackParamList = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  ProfileScreen: undefined;
  ProfileChangeScreen: undefined;
};

type RootStackNavigation<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export function useRootNavigation<T extends keyof RootStackParamList>() {
  return useNavigation<RootStackNavigation<T>>();
}

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
        <Stack.Screen
          name='ProfileChangeScreen'
          component={ProfileChangeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
