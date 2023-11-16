import {ObservableComputed} from '@legendapp/state';
import {Computed, useComputed} from '@legendapp/state/react';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import CoinItem from './CoinItem';
import FearAndGreedIndex from './FearAndGreedIndex';
import {state$} from '../GlobalState';
import {WHITE} from '../utils/Theme';
import {Coin} from '../utils/Types';
import {keysOf} from '../utils/TypeScriptHelperFunctions';

function CoinList() {
  const coins$: ObservableComputed<Coin[]> = useComputed(() => {
    const coinToPriceMap = state$.coinToPriceMap.get();
    return keysOf(coinToPriceMap).map((coinName) => ({
      name: coinName,
      price: Number(coinToPriceMap[coinName]),
    }));
  });
  return (
    <Computed>
      <FlatList
        data={coins$.get()}
        contentContainerStyle={styles.flatlist}
        renderItem={({index}) => {
          return <CoinItem coin$={coins$[index]} />;
        }}
      />
    </Computed>
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
