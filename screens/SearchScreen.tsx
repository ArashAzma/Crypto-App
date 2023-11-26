import {ObservableComputed} from '@legendapp/state';
import {Computed, useComputed, useObservable} from '@legendapp/state/react';
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import {keysOf} from './../utils/HelperFunctions';
import CoinItem from '../components/CoinItem';
import TextField from '../components/TextField';
import TextFieldLabel from '../components/TextFieldLabel';
import {state$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {BLACK, DARK_BLUE, WHITE} from '../utils/Theme';
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
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextField
          text$={search$.text}
          debouncedText$={search$.debouncedText}
        />
        <TextFieldLabel
          text$={search$.text}
          debouncedText$={search$.debouncedText}
        />
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
  text: {
    color: WHITE,
  },
});
export default SearchScreen;
