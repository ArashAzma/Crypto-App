import {ObservablePrimitiveBaseFns} from '@legendapp/state';
import {Computed} from '@legendapp/state/react';
import React from 'react';
import {
  RadioGroup,
  RadioButtonProps as RadioButtonType,
} from 'react-native-radio-buttons-group';

import {Gender} from '../utils/Types';

type RadioButtonProps = {
  radioButtons: RadioButtonType[];
  selectedId: ObservablePrimitiveBaseFns<NonNullable<Gender>>;
};

function RadioButton(props: RadioButtonProps) {
  const {radioButtons, selectedId} = props;

  function onPress(id: string) {
    selectedId.set(id as Gender);
  }

  return (
    <Computed>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={onPress}
        selectedId={selectedId.get()}
        layout='row'
      />
    </Computed>
  );
}

export default RadioButton;
