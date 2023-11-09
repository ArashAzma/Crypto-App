import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {WHITE} from '../utils/Theme';
import {type CoinsType} from '../utils/Types';

function CoinList(props: CoinsType) {
  const {data} = props;
  return (
    <View>
      <Text style={styles.text}>CoinList </Text>
      <Text style={styles.text}>{JSON.stringify(data)} </Text>
    </View>
  );
}

export default CoinList;

const styles = StyleSheet.create({
  text: {color: WHITE},
});
