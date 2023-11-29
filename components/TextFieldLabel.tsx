import {MaterialCommunityIcons} from '@expo/vector-icons';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {RED, WHITE} from '../utils/Theme';

type TextFieldLabelProps = {
  showIcon: 'magnify' | 'close' | null;
  onPress: () => void;
};

function TextFieldLabel(props: TextFieldLabelProps) {
  const {showIcon, onPress} = props;

  if (!showIcon) return null;

  if (showIcon === 'magnify') {
    return (
      <MaterialCommunityIcons
        name='magnify'
        size={26}
        color={WHITE}
        style={styles.container}
      />
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <MaterialCommunityIcons name='close' size={24} color={RED} />
    </TouchableOpacity>
  );
}

export default TextFieldLabel;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 10,
    top: 5,
    end: 8,
  },
});
