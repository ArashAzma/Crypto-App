import React from 'react';
import {StyleSheet, View} from 'react-native';

import HeaderCurrencyChange from './HeaderCurrencyChange';
import HeaderSearch from './HeaderSearch';
import HeaderShowPinnedCoin from './HeaderShowPinnedCoin';
import {screenWidth} from '../utils/Dimensions';

function Header() {
  return (
    <View style={styles.continer}>
      <HeaderSearch />
      <HeaderCurrencyChange />
      <HeaderShowPinnedCoin />
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
