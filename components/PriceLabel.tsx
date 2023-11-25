import {ObservableComputed} from '@legendapp/state';
import {useSelector} from '@legendapp/state/react';
import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {settings$} from '../GlobalState';
import {WHITE} from '../utils/Theme';

type PriceLabelProps = {
  computedPrice$: ObservableComputed<number>;
};

function PriceLabel(props: PriceLabelProps) {
  const {computedPrice$} = props;

  const computedPrice = useSelector(computedPrice$);
  const computedCurrency = useSelector(settings$.isCurrencyDollar);

  return (
    <Text style={styles.price}>
      {computedPrice.toPrecision(10)} {computedCurrency ? '$' : 'T'}
    </Text>
  );
}

const styles = StyleSheet.create({
  price: {
    color: WHITE,
    fontWeight: '200',
    fontSize: 12,
  },
});
export default PriceLabel;
