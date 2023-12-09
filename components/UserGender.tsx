import {useSelector} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {settings$} from '../GlobalState';
import {WHITE} from '../utils/Theme';

function UserGender() {
  const gender = useSelector(settings$.user.gender);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gender :</Text>
      <Text style={styles.text}>
        {gender === undefined
          ? "You currently haven't set up your gender."
          : gender}
      </Text>
    </View>
  );
}

export default UserGender;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 5,
  },
  text: {
    width: 170,
    fontSize: 18,
    color: WHITE,
    fontWeight: '900',
    opacity: 0.7,
  },
  label: {
    color: WHITE,
    fontWeight: '900',
    fontSize: 16,
    opacity: 0.6,
  },
});
