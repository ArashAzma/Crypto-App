import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
        <Stack.Screen name='SearchScreen' component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
