import React, {useRef} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';

import CoinItem from './CoinItem';
import {state$} from '../GlobalState';
import {WHITE} from '../utils/Theme';

function CoinList() {
  const data$ = state$.coins.get();
  const coinDataArray = Object.keys(data$).map((key: string) => ({
    name: key,
    price: Number(data$[key as keyof typeof data$]),
  }));
  const renderCount = ++useRef(0).current;
  return (
    <>
      <Text style={styles.renderText}>LIST{renderCount}</Text>
      <FlatList
        data={coinDataArray}
        contentContainerStyle={styles.flatlist}
        renderItem={({item}) => <CoinItem coin={item} />}
      />
    </>
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
  renderText: {
    color: WHITE,
  },
});

export default CoinList;
