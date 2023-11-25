import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ObservableComputed} from '@legendapp/state';
import {
  Computed,
  useComputed,
  useObservable,
  useObserve,
} from '@legendapp/state/react';
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {keysOf} from './../utils/HelperFunctions';
import CoinItem from '../components/CoinItem';
import TextField from '../components/TextField';
import {state$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {BLACK, DARK_BLUE, WHITE} from '../utils/Theme';
import {CoinName, type Coin} from '../utils/Types';

function SearchScreen() {
  const search$ = useObservable({
    text: '',
    searchedCoins: [] as Coin[],
  });
  const coins$: ObservableComputed<Coin[]> = useComputed(() => {
    const coinToPriceMap = state$.coinToPriceMap.get();
    return keysOf(coinToPriceMap).map((coinName) => ({
      name: coinName as CoinName,
      price: Number(coinToPriceMap[coinName]),
    }));
  });
  useObserve(coins$, () => submitSearch());

  function submitSearch() {
    const searchInput = search$.text.peek();

    if (searchInput.length === 0) return;

    const matchingCoins = coins$
      .peek()
      .filter((coin) =>
        coin.name.toLowerCase().includes(searchInput.toLowerCase()),
      );
    search$.searchedCoins.set(matchingCoins);
  }
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextField text$={search$.text} onSubmit={submitSearch} />
        <TouchableOpacity onPress={submitSearch} style={styles.magnify}>
          <MaterialCommunityIcons name='magnify' size={26} color={WHITE} />
        </TouchableOpacity>
      </View>
      <Computed>
        <FlatList
          data={search$.searchedCoins.get()}
          renderItem={({index}) => (
            <CoinItem coin$={search$.searchedCoins[index]} />
          )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: screenWidth * 0.9,
    height: 55,
    borderRadius: 14,
    marginVertical: 40,
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '85%',
    height: '100%',
    backgroundColor: DARK_BLUE,
    borderRadius: 14,
    paddingHorizontal: 10,
  },
  magnify: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DARK_BLUE,
    borderRadius: 14,
    width: 45,
    height: '100%',
  },
  text: {
    color: WHITE,
  },
});
export default SearchScreen;
