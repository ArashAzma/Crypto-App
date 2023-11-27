import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

function EmptySearchList() {
  return (
    <View style={styles.container}>
      <Image source={require(`../assets/not_found.png`)} style={styles.image} />
    </View>
  );
}

export default EmptySearchList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
});
