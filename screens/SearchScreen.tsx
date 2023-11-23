import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useObservable} from '@legendapp/state/react';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import TextField from '../components/TextField';
import {state$} from '../GlobalState';
import {screenWidth} from '../utils/Dimensions';
import {BLACK, DARK_BLUE, WHITE} from '../utils/Theme';
import {type Coin} from '../utils/Types';

function SearchScreen() {
  const search$ = useObservable({text: '', searchedCoins: [] as Coin[]});

  function submitSearch() {
    const searchInput = search$.text.peek();
    console.log('searchInput: ', searchInput);
    console.log('peek', state$.coinToPriceMap.peek());
    const matchingCoins = Object.keys(state$.coinToPriceMap.peek()).filter(
      (coin) => coin.toLowerCase().includes(searchInput.toLowerCase()),
    );

    console.log('Matching Coins:', matchingCoins);
  }
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextField text$={search$.text} onSubmit={submitSearch} />
        <TouchableOpacity onPress={submitSearch} style={styles.magnify}>
          <MaterialCommunityIcons name='magnify' size={26} color={WHITE} />
        </TouchableOpacity>
      </View>
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
    height: 45,
    borderRadius: 14,
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
