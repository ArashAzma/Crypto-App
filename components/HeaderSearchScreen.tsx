import {ObservablePrimitiveChildFns} from '@legendapp/state';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import TextField from './TextField';
import TextFieldLabel from './TextFieldLabel';
import {screenWidth} from '../utils/Dimensions';
import {DARK_BLUE} from '../utils/Theme';

type HeaderSearchScreenProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  debouncedText$: ObservablePrimitiveChildFns<string>;
};

function HeaderSearchScreen(props: HeaderSearchScreenProps) {
  const {text, setText, debouncedText$} = props;

  return (
    <View style={styles.container}>
      <TextField
        text={text}
        setText={setText}
        debouncedText$={debouncedText$}
      />
      <TextFieldLabel
        text={text}
        setText={setText}
        debouncedText$={debouncedText$}
      />
    </View>
  );
}

export default HeaderSearchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_BLUE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: screenWidth * 0.9,
    height: 55,
    borderRadius: 14,
    marginVertical: 60,
  },
});
