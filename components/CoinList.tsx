import {ObservableComputed} from '@legendapp/state';
import {Computed, useComputed} from '@legendapp/state/react';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

import FearAndGreedIndex from './FearAndGreedIndex';
import PinnedCoin from './PinnedCoin';
import SwipeableCoin from './SwipeableCoin';
import {settings$, state$} from '../GlobalState';
import {WHITE} from '../utils/Theme';
import {type Coin} from '../utils/Types';

function CoinList() {
  const coins$: ObservableComputed<Coin[]> = useComputed(() => {
    return state$.coins.get();
  });

  function getListHeaderJSX() {
    const pinExists = state$.pinnedCoin.peek()?.name !== null;
    const showPin = settings$.showPinnedCoin.peek();
    return (
      <>
        {pinExists && showPin && (
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
        data={state$.coins.get()}
        contentContainerStyle={styles.flatlist}
        ListHeaderComponent={getListHeaderJSX}
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
