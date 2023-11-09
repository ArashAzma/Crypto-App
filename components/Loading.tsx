import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {BLACK} from '../utils/Theme';

type LoadingProps = {subject?: 'initial loading' | 'normal'};

const Loading = (props: LoadingProps) => {
  const {subject = 'normal'} = props;
  return (
    <View
      style={subject === 'initial loading' ? styles.container : styles.loader}
    >
      <ActivityIndicator size='large' />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: BLACK,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loader: {
    position: 'absolute',
    top: 35,
  },
});
