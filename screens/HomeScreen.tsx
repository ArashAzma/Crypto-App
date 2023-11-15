import {useQuery} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CoinList from '../components/CoinList';
import Error from '../components/Error';
import Loading from '../components/Loading';
import {state$} from '../GlobalState';
import {getCoinList} from '../utils/ApiCalls';
import {BLACK} from '../utils/Theme';

function HomeScreen() {
  const {data, isSuccess, isLoading, isError, error} = useQuery({
    queryKey: ['coin', 'list'],
    queryFn: getCoinList,
    refetchInterval: 3000,
  });

  useEffect(() => {
    if (isSuccess) {
      state$.coinToPriceMap.set(data);
    }
  }, [isSuccess, data]);

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
    backgroundColor: BLACK,
  },
});

export default HomeScreen;
