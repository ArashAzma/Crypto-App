import {ObservablePrimitiveBaseFns} from '@legendapp/state';
import {Computed} from '@legendapp/state/react';
import React from 'react';

import RadioGroup from './RadioGroup';
import {type Gender, type RadioButtonType} from '../utils/Types';

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
      />
    </Computed>
  );
}

export default RadioButton;
