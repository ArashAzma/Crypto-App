import React from 'react';
import {StyleSheet, View} from 'react-native';

import RadioButtonOption from './RadioButtonOption';
import {type RadioButtonType} from '../utils/Types';

type RadioGroupProps = {
  radioButtons: RadioButtonType[];
  selectedId: string;
  onPress: (id: string) => void;
};

function RadioGroup(props: RadioGroupProps) {
  const {radioButtons, selectedId, onPress} = props;

  function handlePress(id: string) {
    if (id !== selectedId) {
      onPress(id);
    }
  }

  return (
    <View style={styles.container}>
      {radioButtons.map((button) => (
        <RadioButtonOption
          {...button}
          key={button.id}
          selected={button.id === selectedId}
          onPress={() => handlePress(button.id)}
        />
      ))}
    </View>
  );
}

export default RadioGroup;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
