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
import {settings$, state$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {DARK_BLUE, GREEN, RED, WHITE} from '../utils/Theme';
import {Coin} from '../utils/Types';

type CoinItemProps = {
  coin$: ObservableBaseFns<Coin>;
};

function CoinItem(props: CoinItemProps) {
  const {coin$} = props;
  const item$ = useObservable({
    percentage: 0,
    color: DARK_BLUE,
    price: {inDollar: 0, inToman: 0},
  });

  function calculatePercentageAndColor(
    inDollar: number,
    inToman: number,
    previousInDollar: number,
    previousInToman: number,
  ) {
    const isDollarAdjusted = settings$.currency.peek() === 'Dollar';
    const current = isDollarAdjusted ? inDollar : inToman;
    const previous = isDollarAdjusted ? previousInDollar : previousInToman;

    const calculatedPercentage = getDifferencePercent(previous, current);
    const roundedPercentage = Number(calculatedPercentage.toPrecision(2));

    item$.percentage.set(roundedPercentage);
    item$.color.set(calculatedPercentage > 0 ? GREEN : RED);
  }

  useObserve(state$.dollarPriceInToman, () => {
    const {price: dollarPrice} = coin$.peek();
    const dollarPriceInToman = state$.peek().dollarPriceInToman;
    const tomanPrice = dollarPrice * dollarPriceInToman;
    item$.price.set({inDollar: dollarPrice, inToman: tomanPrice});
  });
  useObserve(item$.price, (event) => {
    if (!event.value || !event.previous) return;
    const {inDollar, inToman} = event.value;
    const {inDollar: previousInDollar, inToman: previousInToman} =
      event.previous;
    calculatePercentageAndColor(
      inDollar,
      inToman,
      previousInDollar,
      previousInToman,
    );
  });

  const computedPercentage$ = useComputed(() => item$.get().percentage);
  const computedPrice$ = useComputed(() =>
    settings$.currency.get() === 'Dollar'
      ? item$.get().price.inDollar
      : item$.get().price.inToman,
  );

  function getDifferencePercent(x1: number, x2: number) {
    if (x1 === 0) return 0;
    const deltaX = x2 - x1;
    return (deltaX / x1) * 100;
  }

  return (
    <View style={styles.container}>
      <Computed>
        <LinearGradient
          style={styles.colorContainer}
          colors={[item$.get().color, 'transparent']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        />
      </Computed>
      <Text style={styles.name}>{coin$.peek().name}</Text>
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
  container: {
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
