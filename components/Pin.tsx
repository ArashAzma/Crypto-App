import {AntDesign} from '@expo/vector-icons';
import {ObservableComputed, ObservableBaseFns} from '@legendapp/state';
import {Computed} from '@legendapp/state/react';
import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {SocketContext} from '../contexts/SocketContext';
import {state$} from '../GlobalState';
import {WHITE} from '../utils/Theme';
import {Coin, CoinName} from '../utils/Types';

type PinProps = {
  isPinned: ObservableComputed<boolean>;
  coin$?: ObservableBaseFns<Coin>;
};

function Pin(props: PinProps) {
  const {isPinned, coin$} = props;
  const socketContext = useContext(SocketContext);

  function pinPress() {
    isPinned.peek() ? unpinCoin() : pinCoin();
  }
  function unpinCoin() {
    const pinnedCoinName: CoinName = state$.pinnedCoin?.name?.peek();
    socketContext?.handleSubscribeToCoinChangeFromSocket(
      'unsubscribe',
      pinnedCoinName,
    );
    state$.pinnedCoin.name.set(null);
  }

  function pinCoin() {
    if (!coin$) return;
    const coinName: CoinName = coin$.peek().name;
    const pinnedCoinName: CoinName = state$.pinnedCoin?.name?.peek();
    socketContext?.handleSubscribeToCoinChangeFromSocket(
      'unsubscribe',
      pinnedCoinName,
    );
    socketContext?.handleSubscribeToCoinChangeFromSocket('subscribe', coinName);
    state$.pinnedCoin?.name.set(coinName);
    state$.pinnedCoin?.priceArray.set([]);
  }

  return (
    <TouchableOpacity onPress={pinPress} style={styles.container}>
      <Computed>
        <AntDesign
          name={isPinned.get() ? 'pushpin' : 'pushpino'}
          size={22}
          color={WHITE}
        />
      </Computed>
    </TouchableOpacity>
  );
}

export default Pin;

const styles = StyleSheet.create({
  container: {
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{scaleX: -1}],
  },
});
