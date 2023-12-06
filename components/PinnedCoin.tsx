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
import {settings$, state$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {capitalize, getDifferencePercent} from '../utils/HelperFunctions';
import {DARK_BLUE, GREEN, RED, WHITE} from '../utils/Theme';

const DIMENSION = screenWidth * 0.9;

function PinnedCoin() {
  const item$ = useObservable({
    percentage: 0,
    color: DARK_BLUE,
    isPinned: true,
  });
  function calculatePercentageAndColor(
    inDollar: number,
    previousInDollar: number,
  ) {
    const current = inDollar;
    const previous = previousInDollar;

    const calculatedPercentage = getDifferencePercent(previous, current);
    const roundedPercentage = Number(calculatedPercentage.toPrecision(2));
    item$.percentage.set(roundedPercentage);
    item$.color.set(calculatedPercentage > 0 ? GREEN : RED);
  }

  useObserve(state$.pinnedCoin.priceHistory, () => {
    const currentInDollar = state$.pinnedCoin.priceHistory.get()?.at(-1);
    const previousInDollar = state$.pinnedCoin.priceHistory.get()?.at(-2);

    if (!(currentInDollar && previousInDollar)) return;

    calculatePercentageAndColor(currentInDollar, previousInDollar);
  });

  const computedTitle$ = useComputed(() => {
    const pinnedCoinName = state$.pinnedCoin?.name.get();
    return capitalize(pinnedCoinName);
  });
  const computedPercentage$ = useComputed(() => item$.percentage.get());
  const computedPrice$ = useComputed(() => {
    const priceInDollar = state$.pinnedCoin.priceHistory.get()?.at(-1);
    const isCurrencyDollar = settings$.isCurrencyDollar.get();
    const dollarPriceInToman = state$.dollarPriceInToman.peek();

    if (!priceInDollar) return 0;

    return isCurrencyDollar
      ? priceInDollar
      : priceInDollar * dollarPriceInToman;
  });

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
        <Pin isPinned$={item$.isPinned} />
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
