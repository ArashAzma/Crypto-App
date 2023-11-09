import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import CoinList from '../components/CoinList';
import Error from '../components/Error';
import Loading from '../components/Loading';
import {getCoinList} from '../utils/ApiCalls';
import {BLACK} from '../utils/Theme';

function HomeScreen() {
  const {
    isLoading,
    isError,
    data: coinsData,
    error,
  } = useQuery({
    queryKey: ['coin', 'list'],
    queryFn: getCoinList,
  });
  if (isLoading) {
    return <Loading subject='initial loading' />;
  }
  if (isError) {
    return <Error message={error.message} />;
  }
  return (
    <View style={styles.continer}>
      <Text>HomeScreen</Text>
      <CoinList data={coinsData} />
    </View>
  );
}

export default HomeScreen;
const styles = StyleSheet.create({
  continer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BLACK,
  },
});
