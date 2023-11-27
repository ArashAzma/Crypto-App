import {useSelector} from '@legendapp/state/react';
import React from 'react';
import {StyleSheet, Text, View, TextStyle} from 'react-native';

import {settings$} from '../GlobalState';
import {WHITE} from '../utils/Theme';

type UserNameProps = {style: TextStyle};

function UserName(props: UserNameProps) {
  const style = props.style;
  const firstName = useSelector(settings$.user.firstName);
  const lastName = useSelector(settings$.user.lastName);

  return (
    <View>
      <Text style={[styles.text, style]}>
        {firstName} {lastName}
      </Text>
    </View>
  );
}

export default UserName;

const styles = StyleSheet.create({
  text: {
    color: WHITE,
    fontWeight: '600',
  },
});
