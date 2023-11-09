import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import PercentageLabel from './PercentageLabel';
import PriceLabel from './PriceLabel';
import {screenWidth} from '../utils/Dimensions';
import {DARK_BLUE, WHITE} from '../utils/Theme';

type CoinItemProps = {coin: {name: string; price: number}};

function CoinItem(props: CoinItemProps) {
  const {coin} = props;
  return (
    <View style={styles.continer}>
      <Text style={styles.name}>{coin.name}</Text>
      <View style={styles.priceAndPercentage}>
        <PriceLabel price={coin.price} />
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
  name: {color: WHITE, fontWeight: '600', fontSize: 16},
});
export default CoinItem;
