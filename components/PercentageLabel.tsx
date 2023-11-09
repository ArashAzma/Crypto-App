import {AntDesign} from '@expo/vector-icons';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {GREEN, RED} from '../utils/Theme';

type PercentageLabelProps = {percentage: number; isGrowth: boolean};

function PercentageLabel(props: PercentageLabelProps) {
  const {percentage, isGrowth} = props;
  return (
    <View style={styles.continer}>
      <AntDesign
        name={isGrowth ? 'caretup' : 'caretdown'}
        size={10}
        color={isGrowth ? GREEN : RED}
        style={styles.arrow}
      />
      <Text style={{...styles.Percentage, color: isGrowth ? GREEN : RED}}>
        {percentage}
      </Text>
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
  Percentage: {color: GREEN, fontWeight: '400', fontSize: 14},
});
export default PercentageLabel;
