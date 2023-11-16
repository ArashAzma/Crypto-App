import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CoinList from '../components/CoinList';
import Error from '../components/Error';
import Loading from '../components/Loading';
import {state$} from '../GlobalState';
import useWebSocket from '../hooks/useWebSocket';
import {getCoinList} from '../utils/ApiCalls';
import {BLACK} from '../utils/Theme';

function HomeScreen() {
  const socket = useWebSocket();
  const {isLoading, isError, error} = useQuery({
    queryKey: ['coin', 'list'],
    queryFn: async () => {
      const data = await getCoinList();
      state$.coinToPriceMap.set(data);
      return null;
    },
    refetchInterval: 3000,
  });
  if (isLoading) {
    return <Loading subject='initial loading' />;
  }
  if (isError) {
    const errorMessage = (error as Error).message;
    return <Error message={errorMessage} />;
  }
  return (
    <SafeAreaView style={styles.continer}>
      <CoinList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLACK,
  },
});

export default HomeScreen;
