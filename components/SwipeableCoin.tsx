import {AntDesign} from '@expo/vector-icons';
import {ObservableBaseFns} from '@legendapp/state';
import {Computed, useComputed} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';

import CoinItem from './CoinItem';
import {state$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {WHITE} from '../utils/Theme';
import {Coin} from '../utils/Types';

type CoinItemProps = {
  coin$: ObservableBaseFns<Coin>;
};

function SwipeableCoin(props: CoinItemProps) {
  const {coin$} = props;
  const isPinned = useComputed(
    () => state$.pinnedCoin.name.get() === coin$.get().name,
  );

  function swipeRight() {
    return (
      <Computed>
        <TouchableOpacity>
          <View style={styles.swipeButton}>
            <AntDesign
              name={isPinned.get() ? 'pushpin' : 'pushpino'}
              size={22}
              color={WHITE}
            />
          </View>
        </TouchableOpacity>
      </Computed>
    );
  }

  return (
    <Swipeable renderRightActions={swipeRight}>
      <CoinItem coin$={coin$} />
    </Swipeable>
  );
}

export default React.memo(SwipeableCoin);

const styles = StyleSheet.create({
  swipeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '85%',
    flexDirection: 'row',
    width: screenWidth * 0.2,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 24,
    transform: [{scaleX: -1}],
  },
});
