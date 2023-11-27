import {useSelector} from '@legendapp/state/react';
import React from 'react';
import {Image, ImageStyle} from 'react-native';

import {settings$} from '../GlobalState';

type UserProfileProps = {style: ImageStyle};

function UserProfile(props: UserProfileProps) {
  const style = props.style;
  const imageURL = useSelector(settings$.user.imageUrl);

  return <Image source={{uri: imageURL}} style={style} />;
}

export default UserProfile;
