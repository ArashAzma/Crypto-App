import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';

import {WHITE} from '../utils/Theme';

type RadioButtonProps = {
  isSelected: boolean;
  onPress: () => void;
  label: string;
};

function RadioButtonOption(props: RadioButtonProps) {
  const {isSelected, onPress, label} = props;

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Ionicons
        name={`radio-button-${isSelected ? 'on' : 'off'}`}
        size={28}
        color={WHITE}
        style={styles.button}
      />
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

export default RadioButtonOption;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    marginRight: 15,
  },
  button: {
    opacity: 0.9,
  },
  text: {
    color: WHITE,
    fontWeight: '900',
    fontSize: 14,
    opacity: 0.6,
  },
});
