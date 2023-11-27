import {ObservablePrimitiveChildFns} from '@legendapp/state';
import {Computed} from '@legendapp/state/react';
import React, {useRef, useEffect} from 'react';
import {StyleSheet, TextInput} from 'react-native';

import {WHITE} from '../utils/Theme';

type TextFieldProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  debouncedText$: ObservablePrimitiveChildFns<string>;
};

function TextField(props: TextFieldProps) {
  const {text, setText, debouncedText$} = props;

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  let timerId: NodeJS.Timeout;

  function onChangeText(searchText: string) {
    setText(searchText);
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      debouncedText$.set(searchText);
    }, 500);
  }

  return (
    <Computed>
      <TextInput
        ref={inputRef}
        value={text}
        style={styles.container}
        onChangeText={onChangeText}
        placeholder='Type something...'
        placeholderTextColor={WHITE}
      />
    </Computed>
  );
}

const styles = StyleSheet.create({
  container: {
    color: WHITE,
    width: '100%',
    height: '100%',
    borderRadius: 14,
    paddingHorizontal: 10,
  },
});

export default TextField;
