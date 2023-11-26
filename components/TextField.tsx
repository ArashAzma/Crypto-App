import {ObservablePrimitiveChildFns} from '@legendapp/state';
import {Computed} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import {DARK_BLUE, WHITE} from '../utils/Theme';

type TextFieldProps = {
  text$: ObservablePrimitiveChildFns<string>;
};

function TextField(props: TextFieldProps) {
  const {text$} = props;
  function handleChangeText(text: string) {
    text$.set(text);
  }
  return (
    <View style={styles.searchContainer}>
      <Computed>
        <TextInput
          value={text$.get()}
          style={styles.text}
          onChangeText={handleChangeText}
          placeholder='Type something...'
          placeholderTextColor={WHITE}
        />
      </Computed>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '85%',
    height: '100%',
    backgroundColor: DARK_BLUE,
    borderRadius: 14,
    paddingHorizontal: 10,
  },
  text: {
    color: WHITE,
  },
});

export default TextField;
