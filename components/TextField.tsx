import {ObservablePrimitiveChildFns} from '@legendapp/state';
import React, {useState} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';

import TextFieldLabel from './TextFieldLabel';
import {screenWidth} from '../utils/Dimensions';
import {DARK_BLUE, WHITE} from '../utils/Theme';

type TextFieldProps = TextInputProps & {
  showIcon: boolean;
  debouncedText$: ObservablePrimitiveChildFns<string>;
};

function TextField(props: TextFieldProps) {
  const {showIcon, debouncedText$, ...rest} = props;

  const [text, setText] = useState('');

  let timerId: NodeJS.Timeout;

  function onChangeText(searchText: string) {
    setText(searchText);
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      debouncedText$.set(searchText);
    }, 500);
  }

  function onPress() {
    setText('');
    debouncedText$.set('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        autoFocus
        style={styles.textInput}
        onChangeText={onChangeText}
        placeholderTextColor={WHITE}
        {...rest}
      />
      <TextFieldLabel
        showIcon={showIcon ? (text.length !== 0 ? 'close' : 'magnify') : null}
        onPress={onPress}
      />
    </View>
  );
}

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
  textInput: {
    color: WHITE,
    width: '100%',
    height: '100%',
    borderRadius: 14,
    paddingHorizontal: 10,
  },
});

export default TextField;
