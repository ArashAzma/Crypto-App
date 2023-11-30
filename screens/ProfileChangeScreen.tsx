import {useObservable} from '@legendapp/state/react';
import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RadioButtonProps} from 'react-native-radio-buttons-group';

import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import TextField from '../components/TextField';
import UserProfile from '../components/UserProfile';
import {settings$} from '../GlobalState';
import {BLACK, WHITE} from '../utils/Theme';

function ProfileChangeScreen() {
  const navigation = useNavigation();
  const info$ = useObservable({
    firstName: settings$.user.firstName.get(),
    lastName: settings$.user.lastName.get(),
    gender: settings$.user.gender.get(),
    imageUrl: settings$.user.imageUrl.get(),
  });

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
    const gender = info$.gender.peek();
    const firstName = info$.firstName.peek();
    const lastName = info$.lastName.peek();
    const imageUrl = info$.imageUrl.peek();

    settings$.user.gender.set(gender);
    settings$.user.firstName.set(firstName);
    settings$.user.lastName.set(lastName);
    settings$.user.imageUrl.set(imageUrl);

    navigation.goBack();
  }

  return (
    <ScrollView style={styles.scrollView}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.bodyContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Account information</Text>
            <UserProfile style={styles.image} />
          </View>
          <TextField
            debouncedText$={info$.firstName}
            placeholder='Enter your first name'
            value={settings$.user.firstName.peek()}
            showIcon={false}
          />
          <TextField
            debouncedText$={info$.lastName}
            placeholder='Enter your last name'
            value={settings$.user.lastName.peek()}
            showIcon={false}
          />
          <TextField
            debouncedText$={info$.imageUrl}
            placeholder='Enter your image url'
            value={settings$.user.imageUrl.peek()}
            showIcon={false}
          />
          <View style={styles.itemContainer}>
            <Text style={styles.text}>Gender :</Text>
            <RadioButton
              radioButtons={radioButtons}
              selectedId={info$.gender}
            />
          </View>
          <View style={styles.itemContainer}>
            <Button title='Save changes' onPress={onPress} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: BLACK,
    paddingTop: 25,
  },
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLACK,
    paddingTop: 24,
    gap: 20,
  },
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
    borderRadius: 24,
    padding: 24,
    gap: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    alignItems: 'center',
    width: '100%',
    height: '26%',
  },
  headerText: {
    color: WHITE,
    width: 200,
    fontWeight: '900',
    fontSize: 28,
    opacity: 0.8,
  },
  radioText: {
    color: WHITE,
    fontWeight: '900',
    fontSize: 14,
    opacity: 0.6,
  },
  text: {
    color: WHITE,
    fontWeight: '900',
    fontSize: 16,
    opacity: 0.7,
  },
});

export default ProfileChangeScreen;
