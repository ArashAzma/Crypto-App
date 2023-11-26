import {ObservablePrimitiveChildFns} from '@legendapp/state';
import {Computed} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

import {DARK_BLUE, WHITE} from '../utils/Theme';

type TextFieldProps = {
  text$: ObservablePrimitiveChildFns<string>;
  debouncedText$: ObservablePrimitiveChildFns<string>;
};

function TextField(props: TextFieldProps) {
  const {text$, debouncedText$} = props;

  let timerId: NodeJS.Timeout;

  function handleChangeText(text: string) {
    debouncedText$.set(text);
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      text$.set(text);
    }, 500);
  }

  return (
    <Computed>
      <TextInput
        value={debouncedText$.get()}
        style={styles.searchContainer}
        onChangeText={handleChangeText}
        placeholder='Type something...'
        placeholderTextColor={WHITE}
      />
    </Computed>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: DARK_BLUE,
    color: WHITE,
    width: '100%',
    height: '100%',
    borderRadius: 14,
    paddingHorizontal: 10,
  },
});

export default TextField;
