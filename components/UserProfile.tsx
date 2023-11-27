import {useSelector} from '@legendapp/state/react';
import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {settings$} from '../GlobalState';

function UserProfile() {
  const imageURL = useSelector(settings$.user.imageUrl);

  return <Image source={{uri: imageURL}} style={styles.image} />;
}

export default UserProfile;

const styles = StyleSheet.create({
  image: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
});
