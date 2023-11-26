import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ObservablePrimitiveChildFns} from '@legendapp/state';
import {Show} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {RED, WHITE} from '../utils/Theme';

type TextFieldLabelProps = {
  text$: ObservablePrimitiveChildFns<string>;
  debouncedText$: ObservablePrimitiveChildFns<string>;
};

function TextFieldLabel(props: TextFieldLabelProps) {
  const {text$, debouncedText$} = props;

  function deleteText() {
    text$.set('');
    debouncedText$.set('');
  }

  return (
    <View style={styles.magnifyOrXMark}>
      <Show
        if={() => text$.get().length > 0}
        else={<MaterialCommunityIcons name='magnify' size={26} color={WHITE} />}
      >
        <TouchableOpacity onPress={deleteText}>
          <MaterialCommunityIcons name='close' size={24} color={RED} />
        </TouchableOpacity>
      </Show>
    </View>
  );
}

export default TextFieldLabel;

const styles = StyleSheet.create({
  magnifyOrXMark: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    height: '100%',
    position: 'absolute',
    end: 10,
  },
});
