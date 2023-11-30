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
    width: '100%',
    gap: 20,
  },
  text: {
    width: 150,
    fontSize: 14,
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
