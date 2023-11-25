import {ObservableBaseFns} from '@legendapp/state';
import {Computed, useComputed} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';

import CoinItem from './CoinItem';
import Pin from './Pin';
import {state$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {type Coin} from '../utils/Types';

type CoinItemProps = {
  coin$: ObservableBaseFns<Coin>;
};

function SwipeableCoin(props: CoinItemProps) {
  const {coin$} = props;

  const computedIsPinned$ = useComputed(
    () => state$.pinnedCoin?.name.get() === coin$.get().name,
  );

  function swipeRight() {
    return (
      <Computed>
        <View style={styles.swipeButton}>
          <Pin computedIsPinned$={computedIsPinned$} coin$={coin$} />
        </View>
      </Computed>
    );
  }

  return (
    <Swipeable renderRightActions={swipeRight}>
      <CoinItem coin$={coin$} />
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  swipeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '85%',
    flexDirection: 'row',
    width: screenWidth * 0.2,
    marginBottom: 12,
    borderRadius: 24,
  },
});
export default React.memo(SwipeableCoin);
