import {
  Computed,
  useComputed,
  useObservable,
  useObserve,
} from '@legendapp/state/react';
import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Chart from './Chart';
import PercentageLabel from './PercentageLabel';
import Pin from './Pin';
import PriceLabel from './PriceLabel';
import {state$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {DARK_BLUE, GREEN, RED, WHITE} from '../utils/Theme';

const DIMENSION = screenWidth * 0.9;

function PinnedCoin() {
  const item$ = useObservable({percentage: 0, color: DARK_BLUE});

  useObserve(() => {
    const price = state$.pinnedCoin.priceArray.get()?.at(-1);
    const previousPrice = state$.pinnedCoin.priceArray.get()?.at(-2);
    if (price && previousPrice) {
      const calculatedPercentage = getDifferencePercent(previousPrice, price);
      item$.percentage.set(Number(calculatedPercentage.toPrecision(2)));
      item$.color.set(calculatedPercentage > 0 ? GREEN : RED);
    }
  });

  const isPinned = useComputed(() => true);
  const computedTitle$ = useComputed(
    () =>
      state$.pinnedCoin.name.get() &&
      state$.pinnedCoin.name.get().charAt(0).toUpperCase() +
        state$.pinnedCoin.name.get().slice(1),
  );
  const computedPercentage$ = useComputed(() => item$.get().percentage);
  const computedPrice$ = useComputed(
    () => (state$.get().pinnedCoin.priceArray?.at(-1) as number) ?? 0,
  );

  function getDifferencePercent(x1: number, x2: number) {
    const deltaX = x2 - x1;

    return (deltaX / x1) * 100;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.colorContainer}
        colors={[DARK_BLUE, 'transparent']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
      />
      <View style={styles.titleContainer}>
        <Computed>
          <Text style={styles.header}>{computedTitle$.get()}</Text>
          <View style={styles.priceAndPercentageContainer}>
            <PriceLabel computedPrice$={computedPrice$} />
            <PercentageLabel percentage$={computedPercentage$} />
          </View>
        </Computed>
      </View>
      <Chart />
      <View style={styles.pin}>
        <Pin isPinned={isPinned} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: DIMENSION,
    borderRadius: 26,
    marginBottom: 14,
  },
  colorContainer: {
    position: 'absolute',
    width: DIMENSION,
    height: '100%',
    borderRadius: 24,
    opacity: 1,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    borderRadius: 26,
    marginBottom: 14,
    padding: 12,
  },
  priceAndPercentageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  header: {
    color: WHITE,
    fontSize: 30,
    fontWeight: '800',
  },
  pin: {
    position: 'absolute',
    top: 5,
    end: 5,
  },
});

export default React.memo(PinnedCoin);
