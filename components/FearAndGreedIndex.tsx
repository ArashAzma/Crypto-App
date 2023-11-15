import {Computed} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {state$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {WHITE} from '../utils/Theme';

function FearAndGreedIndex() {
  const fear$ = state$.fearAndGreedIndex;

  return (
    <View style={styles.container}>
      <Computed>{() => <Text>{fear$.get().toPrecision(3)}</Text>}</Computed>
    </View>
  );
}

export default FearAndGreedIndex;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.9,
    height: 70,
    borderRadius: 24,
    marginBottom: 18,
  },
});
