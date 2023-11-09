import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import PriceLabel from './PriceLabel';
import {screenWidth} from '../utils/Dimensions';
import {GRAY, WHITE} from '../utils/Theme';

type CoinItemProps = {coin: {name: string; price: number}};
function CoinItem(props: CoinItemProps) {
  const {coin} = props;
  return (
    <View style={styles.continer}>
      <Text style={styles.name}>{coin.name}</Text>
      <View>
        <PriceLabel price={coin.price} />
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
    backgroundColor: GRAY,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 12,
  },
  name: {color: WHITE, fontWeight: '600', fontSize: 16},
  price: {color: WHITE, fontWeight: '100', fontSize: 12},
  Percentage: {color: WHITE, fontWeight: '100', fontSize: 12},
});
export default CoinItem;
