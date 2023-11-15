import {ObservableComputed} from '@legendapp/state';
import {useSelector} from '@legendapp/state/react';
import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {WHITE} from '../utils/Theme';

type PriceLabelProps = {
  computedPrice$: ObservableComputed<number>;
};

function PriceLabel(props: PriceLabelProps) {
  const {computedPrice$} = props;
  const computedPrice = useSelector(computedPrice$);

  return <Text style={styles.price}>${computedPrice.toPrecision(10)}</Text>;
}

const styles = StyleSheet.create({
  price: {
    color: WHITE,
    fontWeight: '100',
    fontSize: 12,
  },
});
export default PriceLabel;
