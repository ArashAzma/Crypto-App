import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ObservableComputed} from '@legendapp/state';
import {
  Computed,
  Show,
  useComputed,
  useObservable,
} from '@legendapp/state/react';
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {keysOf} from './../utils/HelperFunctions';
import CoinItem from '../components/CoinItem';
import TextField from '../components/TextField';
import {state$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {BLACK, DARK_BLUE, RED, WHITE} from '../utils/Theme';
import {CoinName, type Coin} from '../utils/Types';

function SearchScreen() {
  const search$ = useObservable({
    text: '',
    debouncedText: '',
  });
  const coins$: ObservableComputed<Coin[]> = useComputed(() => {
    const coinToPriceMap = state$.coinToPriceMap.get();
    const searchInput = search$.text.get();
    if (!searchInput) return [];

    const coinToPriceArray = keysOf(coinToPriceMap).map((coinName) => ({
      name: coinName as CoinName,
      price: Number(coinToPriceMap[coinName]),
    }));

    return coinToPriceArray.filter((coin) =>
      coin.name.toLowerCase().includes(searchInput.toLowerCase()),
    );
  });
  function deleteText() {
    search$.text.set('');
    search$.debouncedText.set('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextField
          text$={search$.text}
          debouncedText$={search$.debouncedText}
        />
        <View style={styles.magnifyOrXMark}>
          <Show
            if={() => search$.text.get().length > 0}
            else={
              <MaterialCommunityIcons name='magnify' size={26} color={WHITE} />
            }
          >
            <TouchableOpacity onPress={deleteText}>
              <MaterialCommunityIcons name='close' size={24} color={RED} />
            </TouchableOpacity>
          </Show>
        </View>
      </View>
      <Computed>
        <FlatList
          data={coins$.get()}
          renderItem={({index}) => <CoinItem coin$={coins$[index]} />}
        />
      </Computed>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLACK,
  },
  textInputContainer: {
    backgroundColor: DARK_BLUE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: screenWidth * 0.9,
    height: 55,
    borderRadius: 14,
    marginVertical: 60,
  },
  magnifyOrXMark: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    height: '100%',
    position: 'absolute',
    end: 10,
  },
  text: {
    color: WHITE,
  },
});
export default SearchScreen;
