import {useObserve} from '@legendapp/state/react';
import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {state$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {
  LIGHT_GREEN,
  DARK_GREEN,
  YELLOW,
  LIGHT_RED,
  DARK_RED,
  WHITE,
} from '../utils/Theme';

const FEAR_BOX_WIDTH = screenWidth * 0.9;

function FearAndGreedIndex() {
  const fear$ = state$.fearAndGreedIndex;
  const offset = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));
  useObserve(fear$, (event) => {
    if (!event.value) return;
    const fearIndex = fear$.get();
    const coordinate = FEAR_BOX_WIDTH * fearIndex;
    offset.value = withSpring(coordinate, {damping: 100});
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fear & Greed index</Text>
      <LinearGradient
        style={styles.gradinetContainer}
        colors={[DARK_RED, LIGHT_RED, YELLOW, LIGHT_GREEN, DARK_GREEN]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      >
        <Animated.View style={[styles.lineContainer, animatedStyle]} />
      </LinearGradient>
    </View>
  );
}

export default FearAndGreedIndex;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
  },
  gradinetContainer: {
    backgroundColor: WHITE,
    width: FEAR_BOX_WIDTH,
    height: 50,
    borderRadius: 18,
    marginBottom: 18,
  },
  header: {
    color: WHITE,
    fontWeight: '900',
  },
  lineContainer: {
    height: '100%',
    width: 12,
    backgroundColor: WHITE,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.21,
    shadowRadius: 6.65,
    elevation: 5,
  },
});
