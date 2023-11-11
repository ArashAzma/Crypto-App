import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import CoinItem from './CoinItem';
import {WHITE} from '../utils/Theme';

type CoinListProps = {
  data: {[key: string]: number};
};

function CoinList(props: CoinListProps) {
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
  flatlist: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: WHITE,
  },
});

export default CoinList;
