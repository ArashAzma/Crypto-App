import {ObservablePrimitiveBaseFns} from '@legendapp/state';
import {Computed} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import RadioButtonOption from './RadioButtonOption';
import {type Gender, type RadioButtonType} from '../utils/Types';

type RadioGroupProps = {
  radioButtons: RadioButtonType[];
  selectedId$: ObservablePrimitiveBaseFns<NonNullable<Gender>>;
  onPress: (id: string) => void;
};

function RadioGroup(props: RadioGroupProps) {
  const {radioButtons, selectedId$, onPress} = props;

  function handlePress(id: string) {
    if (id !== selectedId$.peek()) {
      onPress(id);
    }
  }

  return (
    <Computed>
      <View style={styles.container}>
        {radioButtons.map((button) => (
          <RadioButtonOption
            {...button}
            key={button.id}
            isSelected={button.id === selectedId$.get()}
            onPress={() => handlePress(button.id)}
          />
        ))}
      </View>
    </Computed>
  );
}

export default RadioGroup;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
