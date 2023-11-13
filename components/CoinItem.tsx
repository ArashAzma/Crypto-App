import {ObservableBaseFns} from '@legendapp/state';
import {
  Computed,
  useComputed,
  useObservable,
  useObserve,
} from '@legendapp/state/react';
import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import PercentageLabel from './PercentageLabel';
import PriceLabel from './PriceLabel';
import {screenWidth} from '../utils/Dimensions';
import {DARK_BLUE, GREEN, RED, WHITE} from '../utils/Theme';

type CoinItemProps = {
  coin$: ObservableBaseFns<{name: string; price: number}>;
};

function CoinItem(props: CoinItemProps) {
  const {coin$} = props;
  const itemState$ = useObservable({percentage: 0, color: DARK_BLUE});

  useObserve(coin$, (event) => {
    if (!event.value || !event.previous) return;
    const calculatedPercentage =
      (coin$.get().price - (event.previous.price ?? coin$.get().price)) / 100;
    itemState$.percentage.set(Number(calculatedPercentage.toPrecision(2)));
    itemState$.color.set(calculatedPercentage > 0 ? GREEN : RED);
    setTimeout(() => itemState$.color.set(DARK_BLUE), 3000);
  });

  const computedPercentage$ = useComputed(() => itemState$.get().percentage);
  const computedPrice$ = useComputed(() => coin$.get().price);

  return (
    <View style={[styles.continer]}>
      <Computed>
        {() => (
          <>
            <LinearGradient
              style={styles.colorContainer}
              colors={[itemState$.get().color, 'transparent']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            />
            <Text style={styles.name}>{coin$.peek().name}</Text>
          </>
        )}
      </Computed>
      <View style={styles.priceAndPercentage}>
        <PriceLabel computedPrice$={computedPrice$} />
        <PercentageLabel percentage$={computedPercentage$} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  colorContainer: {
    position: 'absolute',
    width: screenWidth * 0.5,
    height: '100%',
    borderRadius: 24,
    opacity: 0.5,
  },
  continer: {
    flexDirection: 'row',
    width: screenWidth * 0.9,
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: DARK_BLUE,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 24,
  },
  priceAndPercentage: {
    justifyContent: 'space-between',
  },
  name: {
    color: WHITE,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default React.memo(CoinItem);
