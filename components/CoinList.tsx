import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import CoinItem from './CoinItem';
import {WHITE} from '../utils/Theme';
import {type CoinsType} from '../utils/Types';

function CoinList(props: CoinsType) {
  const {data} = props;
  const coinDataArray = Object.keys(data).map((key: string) => ({
    name: key,
    price: Number(data[key as keyof typeof data]),
  }));
  return (
    <FlatList
      data={coinDataArray}
      contentContainerStyle={styles.flatlist}
      renderItem={({item}) => <CoinItem coin={item} />}
    />
  );
}

const styles = StyleSheet.create({
  continer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {color: WHITE},
});

export default CoinList;
