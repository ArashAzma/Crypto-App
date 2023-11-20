import {AntDesign} from '@expo/vector-icons';
import React from 'react';
import {StyleSheet} from 'react-native';

import {WHITE} from '../utils/Theme';

type PinProps = {isPinned: boolean};

function Pin(props: PinProps) {
  const {isPinned} = props;
  return (
    <AntDesign
      name={isPinned ? 'pushpin' : 'pushpino'}
      size={22}
      color={WHITE}
      style={styles.container}
    />
  );
}

export default Pin;

const styles = StyleSheet.create({
  container: {
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    end: 15,
    top: 15,
    transform: [{scaleX: -1}],
  },
});
