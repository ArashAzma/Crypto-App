import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Computed, Show} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {settings$, state$} from '../GlobalState';
import {WHITE} from '../utils/Theme';

function ShowPinnedCoinHeader() {
  function showPinPress() {
    const show = settings$.showPinnedCoin.peek();
    settings$.showPinnedCoin.set(!show);
  }

  return (
    <Show if={() => state$.pinnedCoin.name?.get()?.length > 0}>
      <TouchableOpacity onPress={showPinPress} style={styles.iconContainer}>
        <Computed>
          <MaterialCommunityIcons
            name={
              settings$.showPinnedCoin.get() ? 'pin-off-outline' : 'pin-outline'
            }
            size={25}
            color={WHITE}
          />
        </Computed>
      </TouchableOpacity>
    </Show>
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

export default React.memo(ShowPinnedCoinHeader);
