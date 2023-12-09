import {ObservablePrimitiveChildFns} from '@legendapp/state';
import React, {useRef} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';

import TextFieldLabel from './TextFieldLabel';
import {DARK_BLUE, WHITE} from '../utils/Theme';

type TextFieldProps = TextInputProps & {
  autoFocus?: boolean;
  showIcon: boolean;
  debouncedText$: ObservablePrimitiveChildFns<string>;
};

function TextField(props: TextFieldProps) {
  const {defaultValue, showIcon, debouncedText$, ...rest} = props;
  const textInputRef = useRef<TextInput>(null);
  let timerId: NodeJS.Timeout;

  function onChangeText(searchText: string) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      debouncedText$.set(searchText);
    }, 500);
  }

  function onPress() {
    textInputRef.current?.setNativeProps({text: ''});
    debouncedText$.set('');
  }

  const icon = defaultValue?.length !== 0 ? 'close' : 'magnify';

  return (
    <View style={styles.container}>
      <TextInput
        defaultValue={defaultValue}
        ref={textInputRef}
        style={styles.textInput}
        onChangeText={onChangeText}
        placeholderTextColor={WHITE}
        {...rest}
      />
      <TextFieldLabel
        showIcon={showIcon ? icon : undefined}
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
    height: 55,
    borderRadius: 14,
    marginBottom: 15,
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
