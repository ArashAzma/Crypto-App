import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../utils/Types';

type RootStackNavigation<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export function useRootNavigation<T extends keyof RootStackParamList>() {
  return useNavigation<RootStackNavigation<T>>();
}
