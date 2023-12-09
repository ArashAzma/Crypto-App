import {useSelector} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, Text, View, TextStyle} from 'react-native';

import {settings$} from '../GlobalState';
import {WHITE} from '../utils/Theme';

type UserNameProps = {style: TextStyle; showLabel?: boolean};

function UserName(props: UserNameProps) {
  const {style, showLabel = false} = props;

  const name = useSelector(() => {
    const firstName = settings$.user.firstName.get();
    const lastName = settings$.user.lastName.get();

    return `${firstName} ${lastName}`;
  });

  return (
    <View style={styles.container}>
      {showLabel && <Text style={styles.label}>Name :</Text>}
      <Text style={[styles.text, style]}>{name}</Text>
    </View>
  );
}

export default UserName;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
