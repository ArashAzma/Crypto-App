import {useSelector} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {settings$} from '../GlobalState';
import {WHITE} from '../utils/Theme';

function UserName() {
  const firstName = useSelector(settings$.user.firstName);
  const lastName = useSelector(settings$.user.lastName);

  return (
    <View>
      <Text style={styles.text}>
        {firstName} {lastName}
      </Text>
    </View>
  );
}

export default UserName;

const styles = StyleSheet.create({
  text: {
    color: WHITE,
    fontWeight: '600',
  },
});
