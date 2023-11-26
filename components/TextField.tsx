import {ObservablePrimitiveChildFns} from '@legendapp/state';
import {Computed, useObservable} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

import {DARK_BLUE, WHITE} from '../utils/Theme';

type TextFieldProps = {
  text$: ObservablePrimitiveChildFns<string>;
};

function TextField(props: TextFieldProps) {
  const {text$} = props;
  const debouncedText$ = useObservable({text: ''});

  let timerId: NodeJS.Timeout;

  function handleChangeText(text: string) {
    debouncedText$.text.set(text);
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      text$.set(text);
    }, 500);
  }

  return (
    <Computed>
      <TextInput
        value={debouncedText$.text.get()}
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
