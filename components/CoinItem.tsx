import {useObservable, Computed, useSelector} from '@legendapp/state/react';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import PercentageLabel from './PercentageLabel';
import PriceLabel from './PriceLabel';
import {usePreviousValue} from '../hooks/PerviousProps';
import {screenWidth} from '../utils/Dimensions';
import {DARK_BLUE, WHITE} from '../utils/Theme';

type CoinItemProps = {coin: {name: string; price: number}};

function CoinItem(props: CoinItemProps) {
  const {coin} = props;
  const price = useSelector(coin.price);
  const prevProps = usePreviousValue(props);
  const price$ = useObservable(coin.price);
  const percentage$ = useSelector(calculatePercentage());
  console.log(percentage$, 'boom');

  function calculatePercentage() {
    const difference =
      (coin.price - (prevProps?.coin.price ?? coin.price)) / 100;
    return parseInt(difference.toFixed(2), 10);
  }

  return (
    <View style={styles.continer}>
      <Text style={styles.name}>{coin.name}</Text>
      <View style={styles.priceAndPercentage}>
        <PriceLabel price={price} />
        <PercentageLabel percentage={percentage$} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  continer: {
    flexDirection: 'row',
    width: screenWidth * 0.9,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: DARK_BLUE,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 12,
    borderRadius: 18,
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
export default CoinItem;
