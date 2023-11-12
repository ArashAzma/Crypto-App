import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {WHITE} from '../utils/Theme';

type PriceLabelProps = {price: number};

function PriceLabel(props: PriceLabelProps) {
  const {price} = props;

  return <Text style={styles.price}>${price}</Text>;
}

const styles = StyleSheet.create({
  price: {
    color: WHITE,
    fontWeight: '100',
    fontSize: 12,
  },
});
export default PriceLabel;
