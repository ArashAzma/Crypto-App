import {ObservablePrimitiveBaseFns} from '@legendapp/state';
import {Computed} from '@legendapp/state/react';
import React from 'react';
import {View} from 'react-native';

import RadioButtonOption from './RadioButtonOption';
import {type Gender, type RadioButtonType} from '../utils/Types';

type RadioGroupProps = {
  radioButtons: RadioButtonType[];
  selectedId$: ObservablePrimitiveBaseFns<NonNullable<Gender>>;
  onPress: (id: string) => void;
  layout?: 'row' | 'column';
};

function RadioGroup(props: RadioGroupProps) {
  const {radioButtons, selectedId$, onPress, layout = 'row'} = props;

  function handlePress(id: string) {
    if (id !== selectedId$.peek()) {
      onPress(id);
    }
  }

  return (
    <Computed>
      <View style={{flexDirection: layout}}>
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
