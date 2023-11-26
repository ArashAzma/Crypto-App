import {AntDesign} from '@expo/vector-icons';
import {ObservableComputed} from '@legendapp/state';
import {Computed, useComputed} from '@legendapp/state/react';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {GREEN, RED} from '../utils/Theme';

type PercentageLabelProps = {percentage$: ObservableComputed<number>};

function PercentageLabel(props: PercentageLabelProps) {
  const {percentage$} = props;

  const isGrowth = useComputed(() => (percentage$.get() >= 0 ? true : false));

  return (
    <View style={styles.continer}>
      <Computed>
        <AntDesign
          name={isGrowth.get() ? 'caretup' : 'caretdown'}
          size={10}
          color={isGrowth.get() ? GREEN : RED}
          style={styles.arrow}
        />
        <Text
          style={[styles.percentage, {color: isGrowth.get() ? GREEN : RED}]}
        >
          {percentage$.get()}%
        </Text>
      </Computed>
    </View>
  );
}
const styles = StyleSheet.create({
  continer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  arrow: {
    marginHorizontal: 3,
  },
  percentage: {
    color: GREEN,
    fontWeight: '400',
    fontSize: 14,
  },
});
export default PercentageLabel;
