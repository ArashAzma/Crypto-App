import {enableReactNativeComponents} from '@legendapp/state/config/enableReactNativeComponents';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StatusBar} from 'expo-status-bar';
import React from 'react';

import AppNavigation from './screens/AppNavigation';

const queryClient = new QueryClient();
enableReactNativeComponents();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigation />
      <StatusBar style='auto' />
    </QueryClientProvider>
  );
}
