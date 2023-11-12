import {ObservableBaseFns} from '@legendapp/state';
import {Computed, useComputed, useObservable} from '@legendapp/state/react';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import PercentageLabel from './PercentageLabel';
import PriceLabel from './PriceLabel';
import {screenWidth} from '../utils/Dimensions';
import {DARK_BLUE, WHITE} from '../utils/Theme';

type CoinItemProps = {
  coin: ObservableBaseFns<{name: string; price: number}>;
};

function CoinItem(props: CoinItemProps) {
  const {coin} = props;
  const percentage$ = useObservable({percentage: 0});
  coin.onChange(({value, getPrevious}) => {
    const calculatedPercentage =
      (value.price - (getPrevious().price ?? value.price)) / 100;
    percentage$.percentage.set(Number(calculatedPercentage.toPrecision(2)));
  });
  const computedPercentage = useComputed(() => percentage$.get().percentage);

  return (
    <View style={styles.continer}>
      <Computed>
        {() => (
          <>
            <Text style={styles.name}>{coin.get().name}</Text>
            <View style={styles.priceAndPercentage}>
              <PriceLabel price={coin.get().price} />
              <PercentageLabel percentage={computedPercentage.get()} />
            </View>
          </>
        )}
      </Computed>
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
    paddingVertical: 20,
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
