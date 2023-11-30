import {useObservable} from '@legendapp/state/react';
import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RadioButtonProps} from 'react-native-radio-buttons-group';

import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import {settings$} from '../GlobalState';
import {BLACK, WHITE} from '../utils/Theme';

function ProfileChangeScreen() {
  const navigation = useNavigation();
  const gender$ = useObservable(() => settings$.user.gender.get());

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: 'Male',
        label: 'Male',
        labelStyle: {...styles.text},
      },
      {
        id: 'Female',
        label: 'Female',
        labelStyle: {...styles.text},
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
    <View style={styles.continer}>
      <Text style={styles.text}>First name</Text>
      <Text style={styles.text}>Last name</Text>
      <Text style={styles.text}>Gender</Text>
      <RadioButton radioButtons={radioButtons} selectedId={gender$} />
      <Button title='Save changes' onPress={onPress} />
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
  text: {
    color: WHITE,
    fontWeight: '400',
    fontSize: 16,
  },
});

export default ProfileChangeScreen;
