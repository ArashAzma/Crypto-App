import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Computed, useComputed, useSelector} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {settings$, state$} from '../GlobalState';
import {WHITE} from '../utils/Theme';

function HeaderShowPinnedCoin() {
  const pinnedCoinName = useSelector(state$.pinnedCoin.name);

  const iconName$ = useComputed(() =>
    settings$.showPinnedCoin.get() ? 'pin-off-outline' : 'pin-outline',
  );

  function toggleShowPinnedCoin() {
    settings$.showPinnedCoin.toggle();
  }

  if (pinnedCoinName === null) return;

  return (
    <TouchableOpacity
      onPress={toggleShowPinnedCoin}
      style={styles.iconContainer}
    >
      <Computed>
        <MaterialCommunityIcons
          name={iconName$.get()}
          size={25}
          color={WHITE}
        />
      </Computed>
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

export default React.memo(HeaderShowPinnedCoin);
