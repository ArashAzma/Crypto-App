import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import PercentageLabel from './PercentageLabel';
import PriceLabel from './PriceLabel';
import {screenWidth} from '../utils/Dimensions';
import {DARK_BLUE, WHITE} from '../utils/Theme';

type CoinItemProps = {coin: {name: string; price: number}};

function CoinItem(props: CoinItemProps) {
  const {coin} = props;
  const prevProps = usePreviousValue(props);
  function usePreviousValue<T>(value: T): T | undefined {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  // will be used later
  function calculatePercentage() {
    const difference = coin.price - (prevProps?.coin.price ?? 0);
    console.log(difference);
    return difference.toFixed(2);
  }
  return (
    <View style={styles.continer}>
      <Text style={styles.name}>{coin.name}</Text>
      <View style={styles.priceAndPercentage}>
        <PriceLabel price={coin.price} />
        {/*TODO: Using dynamic data */}
        <PercentageLabel percentage={22.3} isGrowth={false} />
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
