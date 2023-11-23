import {MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';
import {Computed, Show} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {settings$} from '../GlobalState';
import {WHITE} from '../utils/Theme';

function CurrencyChangeHeader() {
  function currencyChangePress() {
    const currency = settings$.currency;
    const isToman = currency.peek() === 'Toman';
    isToman ? currency.set('Dollar') : currency.set('Toman');
  }

  return (
    <Computed>
      <TouchableOpacity
        onPress={currencyChangePress}
        style={styles.iconContainer}
      >
        <Show
          if={() => settings$.currency.get() === 'Toman'}
          else={<FontAwesome name='dollar' size={23} color={WHITE} />}
        >
          <MaterialCommunityIcons
            name='currency-rial'
            size={26}
            color={WHITE}
          />
        </Show>
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
