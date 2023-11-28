import {ObservablePrimitiveChildFns} from '@legendapp/state';
import React from 'react';

import TextField from './TextField';

type HeaderSearchScreenProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  debouncedText$: ObservablePrimitiveChildFns<string>;
};

function HeaderSearchScreen(props: HeaderSearchScreenProps) {
  const {text, setText, debouncedText$} = props;

  return (
    <TextField
      text={text}
      setText={setText}
      debouncedText$={debouncedText$}
      placeholder='Search coins ...'
    />
  );
}

export default HeaderSearchScreen;
