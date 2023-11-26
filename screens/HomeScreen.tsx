import {useQuery} from '@tanstack/react-query';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CoinList from '../components/CoinList';
import Error from '../components/Error';
import Header from '../components/Header';
import Loading from '../components/Loading';
import {SocketContext} from '../contexts/SocketContext';
import {state$} from '../GlobalState';
import {getCoinList} from '../utils/ApiCalls';
import {BLACK} from '../utils/Theme';

function HomeScreen() {
  useContext(SocketContext);
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
      <Header />
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
    paddingTop: 24,
  },
});

export default HomeScreen;
