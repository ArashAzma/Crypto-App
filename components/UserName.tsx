import {useSelector} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, Text, View, TextStyle} from 'react-native';

import {settings$} from '../GlobalState';
import {WHITE} from '../utils/Theme';

type UserNameProps = {style: TextStyle; showLabel: boolean};

function UserName(props: UserNameProps) {
  const {style, showLabel} = props;
  const firstName = useSelector(settings$.user.firstName);
  const lastName = useSelector(settings$.user.lastName);

  return (
    <View style={styles.container}>
      {showLabel && <Text style={styles.label}>Name :</Text>}
      <Text style={[styles.text, style]}>
        {firstName} {lastName}
      </Text>
    </View>
  );
}

export default UserName;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  label: {
    color: WHITE,
    fontWeight: '900',
    fontSize: 16,
    opacity: 0.6,
  },
  text: {
    color: WHITE,
    fontWeight: '900',
    opacity: 0.75,
  },
});
