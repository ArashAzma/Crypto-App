import React from 'react';
import {StyleSheet, View} from 'react-native';

import CurrencyChangeHeader from './CurrencyChangeHeader';
import SearchHeader from './SearchHeader';
import ShowPinnedCoinHeader from './ShowPinnedCoinHeader';
import {screenWidth} from '../utils/Dimensions';

function Header() {
  return (
    <View style={styles.continer}>
      <SearchHeader />
      <CurrencyChangeHeader />
      <ShowPinnedCoinHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  continer: {
    width: screenWidth * 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
});
export default React.memo(Header);
