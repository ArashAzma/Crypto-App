import {AntDesign} from '@expo/vector-icons';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {WHITE} from '../utils/Theme';

function Pin() {
  return (
    <TouchableOpacity style={styles.container}>
      <AntDesign name='pushpin' size={22} color={WHITE} />
    </TouchableOpacity>
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
    zIndex: 15,
    transform: [{scaleX: -1}],
  },
});
