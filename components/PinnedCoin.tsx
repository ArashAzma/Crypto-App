import {Computed} from '@legendapp/state/react';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Chart from './Chart';
import {state$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {WHITE} from '../utils/Theme';

function PinnedCoin() {
  return (
    <View style={styles.container}>
      <Computed>
        <View>
          <Text style={styles.text}>{state$.get().pinnedCoin.name}</Text>
        </View>
      </Computed>
      <Chart />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth * 0.9,
    borderRadius: 26,
    marginBottom: 14,
  },
  text: {
    color: WHITE,
  },
  renderText: {
    color: WHITE,
  },
});

export default PinnedCoin;
