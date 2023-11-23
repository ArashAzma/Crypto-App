import {MaterialCommunityIcons} from '@expo/vector-icons';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {WHITE} from '../utils/Theme';

function SearchHeader() {
  function searchPress() {
    //TODO : navigate to search screen
  }

  return (
    <TouchableOpacity onPress={searchPress} style={styles.iconContainer}>
      <MaterialCommunityIcons name='magnify' size={26} color={WHITE} />
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

export default React.memo(SearchHeader);
