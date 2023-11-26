import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {BLACK, RED} from '../utils/Theme';

type ErrorProps = {message: string};

const Error = (props: ErrorProps) => {
  const {message} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Error</Text>
      <Text style={styles.body}>{message}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    backgroundColor: BLACK,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    color: RED,
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 10,
  },
  body: {
    color: RED,
    fontSize: 18,
    fontWeight: '700',
  },
});
