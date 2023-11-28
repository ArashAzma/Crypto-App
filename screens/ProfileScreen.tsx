import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {View, StyleSheet} from 'react-native';

import {useRootNavigation} from './AppNavigation';
import Button from '../components/Button';
import UserGender from '../components/UserGender';
import UserName from '../components/UserName';
import UserProfile from '../components/UserProfile';
import {screenWidth} from '../utils/Dimensions';
import {BLACK, DARK_BLUE} from '../utils/Theme';

function ProfileScreen() {
  const navigation = useRootNavigation();

  function onPress() {
    navigation.navigate('ProfileChangeScreen');
  }

  return (
    <View style={styles.continer}>
      <LinearGradient
        style={styles.colorContainer}
        colors={[DARK_BLUE, 'transparent']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
      />
      <UserProfile style={styles.image} />
      <UserName style={styles.userName} />
      <UserGender />
      <Button title='change info' onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLACK,
    paddingTop: 24,
    gap: 20,
  },
  colorContainer: {
    position: 'absolute',
    width: screenWidth,
    height: '100%',
    opacity: 0.5,
  },
  userName: {
    fontSize: 28,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});

export default ProfileScreen;
