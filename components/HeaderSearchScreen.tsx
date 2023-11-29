import {ObservablePrimitiveChildFns} from '@legendapp/state';
import React from 'react';

import TextField from './TextField';

type HeaderSearchScreenProps = {
  debouncedText$: ObservablePrimitiveChildFns<string>;
};

function HeaderSearchScreen(props: HeaderSearchScreenProps) {
  const {debouncedText$} = props;

  return (
    <TextField
      debouncedText$={debouncedText$}
      placeholder='Search coins ...'
      showIcon
    />
  );
}

export default HeaderSearchScreen;
