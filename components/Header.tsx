import React from 'react';
import {StyleSheet, View} from 'react-native';

import HeaderCurrencyChange from './HeaderCurrencyChange';
import HeaderProfile from './HeaderProfile';
import HeaderSearch from './HeaderSearch';
import HeaderShowPinnedCoin from './HeaderShowPinnedCoin';
import {screenWidth} from '../utils/Dimensions';

function Header() {
  return (
    <View style={styles.continer}>
      <View style={styles.leftContainer}>
        <HeaderSearch />
        <HeaderCurrencyChange />
        <HeaderShowPinnedCoin />
      </View>
      <HeaderProfile />
    </View>
  );
}

const styles = StyleSheet.create({
  continer: {
    width: screenWidth * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  leftContainer: {
    flexDirection: 'row',
  },
});
export default React.memo(Header);
