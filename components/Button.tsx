import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ButtonProps} from 'react-native';

import {screenWidth} from '../utils/Dimensions';
import {GREEN, LIGHT_GREEN, WHITE} from '../utils/Theme';

function Button(props: ButtonProps) {
  const {onPress, title} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        style={styles.colorContainer}
        colors={[GREEN, LIGHT_GREEN]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1.5}}
      />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.55,
    height: 35,
    borderRadius: 8,
    marginTop: 12,
  },
  colorContainer: {
    position: 'absolute',
    width: screenWidth * 0.55,
    height: '100%',
    opacity: 0.7,
    borderRadius: 8,
  },
  text: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 16,
  },
});
