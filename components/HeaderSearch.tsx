import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {WHITE} from '../utils/Theme';

function HeaderSearch() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  function searchPress() {
    navigation.navigate('SearchScreen');
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

export default React.memo(HeaderSearch);
