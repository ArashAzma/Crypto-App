import {MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';
import {Show} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {settings$} from '../GlobalState';
import {WHITE} from '../utils/Theme';

function HeaderCurrencyChange() {
  function toggleCurrency() {
    settings$.isCurrencyDollar.toggle();
  }

  return (
    <TouchableOpacity onPress={toggleCurrency} style={styles.iconContainer}>
      <Show
        if={settings$.isCurrencyDollar}
        else={
          <MaterialCommunityIcons
            name='currency-rial'
            size={26}
            color={WHITE}
          />
        }
      >
        <FontAwesome name='dollar' size={23} color={WHITE} />
      </Show>
    </TouchableOpacity>
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
export default React.memo(HeaderCurrencyChange);
