import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {Computed} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {settings$, state$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {WHITE} from '../utils/Theme';

function Header() {
  function iconPress() {
    settings$.currency.peek() === 'Rial'
      ? settings$.currency.set('Dollar')
      : settings$.currency.set('Rial');
  }
  function showPinPress() {
    settings$.showPinnedCoin.peek()
      ? settings$.showPinnedCoin.set(false)
      : settings$.showPinnedCoin.set(true);
  }
  function searchPress() {
    //TODO : navigate to search screen
  }
  return (
    <View style={styles.continer}>
      <Computed>
        <TouchableOpacity onPress={searchPress} style={styles.iconContainer}>
          <MaterialCommunityIcons name='magnify' size={26} color={WHITE} />
        </TouchableOpacity>
        <TouchableOpacity onPress={iconPress} style={styles.iconContainer}>
          {settings$.currency.get() === 'Dollar' ? (
            <FontAwesome name='dollar' size={23} color={WHITE} />
          ) : (
            <MaterialCommunityIcons
              name='currency-rial'
              size={26}
              color={WHITE}
            />
          )}
        </TouchableOpacity>
        {state$.pinnedCoin.get()?.name && (
          <TouchableOpacity onPress={showPinPress} style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={
                settings$.showPinnedCoin.get()
                  ? 'pin-off-outline'
                  : 'pin-outline'
              }
              size={25}
              color={WHITE}
            />
          </TouchableOpacity>
        )}
      </Computed>
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
  iconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
export default React.memo(Header);
