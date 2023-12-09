import {ObservablePrimitiveBaseFns} from '@legendapp/state';
import {Computed} from '@legendapp/state/react';
import React from 'react';
import {View} from 'react-native';

import RadioButtonOption from './RadioButtonOption';
import {type RadioButtonType} from '../utils/Types';

type RadioGroupProps<T> = {
  radioButtons: RadioButtonType[];
  selectedId$: ObservablePrimitiveBaseFns<T>;
  onPress: (id: string) => void;
  layout?: 'row' | 'column';
};

function RadioGroup<T>(props: RadioGroupProps<T>) {
  const {radioButtons, selectedId$, onPress, layout = 'row'} = props;

  function handlePress(id: string) {
    if (id !== selectedId$.peek()) {
      onPress(id);
    }
  }

  return (
    <View style={{flexDirection: layout}}>
      <Computed>
        {radioButtons.map((button) => (
          <RadioButtonOption
            {...button}
            key={button.id}
            isSelected={button.id === selectedId$.get()}
            onPress={() => handlePress(button.id)}
          />
        ))}
      </Computed>
    </View>
  );
}

export default RadioGroup;
