import {ObservableComputed} from '@legendapp/state';
import {Computed, useComputed} from '@legendapp/state/react';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

import FearAndGreedIndex from './FearAndGreedIndex';
import PinnedCoin from './PinnedCoin';
import SwipeableCoin from './SwipeableCoin';
import {settings$, state$} from '../GlobalState';
import {keysOf} from '../utils/HelperFunctions';
import {WHITE} from '../utils/Theme';
import {type Coin, type CoinName} from '../utils/Types';

function CoinList() {
  const coins$: ObservableComputed<Coin[]> = useComputed(() => {
    const coinToPriceMap = state$.coinToPriceMap.get();
    return keysOf(coinToPriceMap).map((coinName) => ({
      name: coinName as CoinName,
      price: Number(coinToPriceMap[coinName]),
    }));
  });
  function listHeader() {
    return (
      <>
        {state$.pinnedCoin.get()?.name && settings$.showPinnedCoin.get() && (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <PinnedCoin />
          </Animated.View>
        )}
        <FearAndGreedIndex />
      </>
    );
  }
  return (
    <Computed>
      <FlatList
        data={coins$.get()}
        contentContainerStyle={styles.flatlist}
        ListHeaderComponent={listHeader}
        renderItem={({index}) => {
          return <SwipeableCoin coin$={coins$[index]} />;
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
