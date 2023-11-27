import {useSelector} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {settings$} from '../GlobalState';
import {WHITE} from '../utils/Theme';

function UserGender() {
  const gender = useSelector(settings$.user.gender);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {gender === null ? "You currently haven't set up your gender." : gender}
      </Text>
    </View>
  );
}

export default UserGender;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 80,
  },
  text: {
    fontSize: 14,
    color: WHITE,
    fontWeight: '200',
  },
});
