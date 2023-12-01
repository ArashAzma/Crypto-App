import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {View, StyleSheet} from 'react-native';

import Button from '../components/Button';
import UserGender from '../components/UserGender';
import UserName from '../components/UserName';
import UserProfile from '../components/UserProfile';
import {useRootNavigation} from '../hooks/useRootNavigation';
import {screenWidth} from '../utils/Dimensions';
import {BLACK, DARK_BLUE, WHITE} from '../utils/Theme';

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
      <View>
        <UserName style={styles.text} showLabel />
        <UserGender />
      </View>
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  text: {
    fontSize: 18,
  },
  label: {
    color: WHITE,
    fontWeight: '900',
    fontSize: 16,
    opacity: 0.6,
  },
});

export default ProfileScreen;
