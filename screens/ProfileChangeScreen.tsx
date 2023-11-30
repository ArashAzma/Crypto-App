import {useObservable} from '@legendapp/state/react';
import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RadioButtonProps} from 'react-native-radio-buttons-group';

import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import UserProfile from '../components/UserProfile';
import {settings$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {BLACK, WHITE} from '../utils/Theme';

function ProfileChangeScreen() {
  const navigation = useNavigation();
  const gender$ = useObservable(() => settings$.user.gender.get());

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: 'Male',
        label: 'Male',
        labelStyle: {...styles.radioText},
      },
      {
        id: 'Female',
        label: 'Female',
        labelStyle: {...styles.radioText},
      },
    ],
    [],
  );

  function onPress() {
    const gender = gender$.peek();
    settings$.user.gender.set(gender);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Account information</Text>
          <UserProfile style={styles.image} />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Last name :</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>First name :</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Gender :</Text>
          <RadioButton radioButtons={radioButtons} selectedId={gender$} />
        </View>
        <View style={styles.itemContainer}>
          <Button title='Save changes' onPress={onPress} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLACK,
    paddingTop: 24,
    gap: 20,
  },
  bodyContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: screenWidth * 0.8,
    height: '70%',
    borderRadius: 24,
    padding: 24,
    gap: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 20,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '26%',
    paddingTop: 24,
  },
  headerText: {
    color: WHITE,
    fontWeight: '900',
    fontSize: 28,
    opacity: 0.8,
  },
  radioText: {
    color: WHITE,
    fontWeight: '900',
    fontSize: 14,
    opacity: 0.45,
  },
  text: {
    color: WHITE,
    fontWeight: '900',
    fontSize: 16,
    opacity: 0.6,
  },
});

export default ProfileChangeScreen;