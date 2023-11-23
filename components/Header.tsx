import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {Computed} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {settings$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {WHITE} from '../utils/Theme';

function Header() {
  function iconPress() {
    settings$.currency.peek() === 'Rial'
      ? settings$.currency.set('Dollar')
      : settings$.currency.set('Rial');
  }
  return (
    <View style={styles.continer}>
      <Computed>
        <TouchableOpacity onPress={iconPress} style={styles.currencyContainer}>
          {settings$.currency.get() === 'Dollar' ? (
            <FontAwesome name='dollar' size={24} color={WHITE} />
          ) : (
            <MaterialCommunityIcons
              name='currency-rial'
              size={24}
              color={WHITE}
            />
          )}
        </TouchableOpacity>
      </Computed>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  continer: {
    width: screenWidth * 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  currencyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
});
