import {AntDesign} from '@expo/vector-icons';
import {ObservableBaseFns} from '@legendapp/state';
import {Computed, useComputed} from '@legendapp/state/react';
import React, {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';

import CoinItem from './CoinItem';
import {SocketContext} from '../contexts/SocketContext';
import {state$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {WHITE} from '../utils/Theme';
import {type Coin, type CoinName} from '../utils/Types';

type CoinItemProps = {
  coin$: ObservableBaseFns<Coin>;
};

function SwipeableCoin(props: CoinItemProps) {
  const {coin$} = props;
  const socketContext = useContext(SocketContext);
  const isPinned = useComputed(
    () => state$.pinnedCoin.name.get() === coin$.get().name,
  );
  function pinCoin() {
    const coinName: CoinName = coin$.get().name;
    const pinnedCoinName: CoinName = state$.pinnedCoin.name.get();
    socketContext?.handleSubscribeToCoinChangeFromSocket(
      'unsubscribe',
      pinnedCoinName,
    );
    socketContext?.handleSubscribeToCoinChangeFromSocket('subscribe', coinName);
    state$.pinnedCoin.name.set(coinName);
    state$.pinnedCoin.priceArray.set([]);
  }
  function swipeRight() {
    return (
      <Computed>
        <TouchableOpacity
          onPress={() =>
            !isPinned.get() ? pinCoin() : console.log('Is Pinned Already')
          }
        >
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
export default React.memo(SwipeableCoin);
