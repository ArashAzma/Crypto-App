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
import {getDifferencePercent} from '../utils/HelperFunctions';
import {DARK_BLUE, GREEN, RED, WHITE} from '../utils/Theme';

const DIMENSION = screenWidth * 0.9;

function PinnedCoin() {
  const item$ = useObservable({
    percentage: 0,
    color: DARK_BLUE,
    isPinned: true,
  });

  useObserve(() => {
    const price = state$.pinnedCoin.priceHistory.get()?.at(-1);
    const previousPrice = state$.pinnedCoin.priceHistory.get()?.at(-2);
    if (price && previousPrice) {
      const calculatedPercentage = getDifferencePercent(previousPrice, price);
      item$.percentage.set(Number(calculatedPercentage.toPrecision(2)));
      item$.color.set(calculatedPercentage > 0 ? GREEN : RED);
    }
  });

  function capitalize(str: string) {
    return str.at(0)?.toUpperCase() + str.slice(1);
  }

  const computedIsPinned$ = useComputed(() => true);
  const computedTitle$ = useComputed(() => {
    const pinnedCoinName = state$.pinnedCoin.name.get();

    return capitalize(pinnedCoinName);
  });
  const computedPercentage$ = useComputed(() => item$.percentage.get());
  const computedPrice$ = useComputed(
    () => state$.pinnedCoin.priceHistory.get()?.at(-1) ?? 0,
  );

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
        <Pin computedIsPinned$={computedIsPinned$} />
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
