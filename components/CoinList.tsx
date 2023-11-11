import {type ObservablePrimitive} from '@legendapp/state';
import {useObservable, useSelector} from '@legendapp/state/react';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import CoinItem from './CoinItem';
import {state$} from '../GlobalState';
import {WHITE} from '../utils/Theme';

// type CoinListProps = {
//   data: ObservablePrimitive<{[key: string]: number} | null>;
// };

function CoinList() {
  const data$ = useSelector(state$.coins);
  const coinDataArray = Object.keys(data$).map((key: string) => ({
    name: key,
    price: Number(data$[key as keyof typeof data$]),
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
