import {MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';
import {Computed} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {settings$} from '../GlobalState';
import {WHITE} from '../utils/Theme';

function CurrencyChangeHeader() {
  function currencyChangePress() {
    settings$.currency.peek() === 'Rial'
      ? settings$.currency.set('Dollar')
      : settings$.currency.set('Rial');
  }

  return (
    <Computed>
      <TouchableOpacity
        onPress={currencyChangePress}
        style={styles.iconContainer}
      >
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
    </Computed>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
export default React.memo(CurrencyChangeHeader);
