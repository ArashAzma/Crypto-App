import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ObservablePrimitiveChildFns} from '@legendapp/state';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {RED, WHITE} from '../utils/Theme';

type TextFieldLabelProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  debouncedText$: ObservablePrimitiveChildFns<string>;
  showIcons: boolean;
};

function TextFieldLabel(props: TextFieldLabelProps) {
  const {text, setText, debouncedText$, showIcons} = props;

  function deleteText() {
    setText('');
    debouncedText$.set('');
  }

  if (!showIcons) return;

  if (text.length === 0) {
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
    <TouchableOpacity onPress={deleteText} style={styles.container}>
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
