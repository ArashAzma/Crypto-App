import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import UserName from './UserName';
import UserProfile from './UserProfile';

function HeaderProfile() {
  const naviagtion = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  function onPress() {
    naviagtion.navigate('Profile');
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <UserName style={styles.userName} />
      <UserProfile style={styles.image} />
    </TouchableOpacity>
  );
}

export default HeaderProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
    height: '100%',
  },
  userName: {
    fontSize: 13,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
});