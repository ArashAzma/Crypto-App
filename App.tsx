import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import AppNavigation from './screens/AppNavigation';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.container}>
        <AppNavigation />
      </GestureHandlerRootView>
      <StatusBar style='auto' />
    </QueryClientProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
