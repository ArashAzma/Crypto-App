import {ObservableComputed} from '@legendapp/state';
import {Computed, useComputed, useObservable} from '@legendapp/state/react';
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import CoinItem from '../components/CoinItem';
import EmptySearchList from '../components/EmptySearchList';
import TextField from '../components/TextField';
import {state$} from '../GlobalState';
import {BLACK, WHITE} from '../utils/Theme';
import {type Coin} from '../utils/Types';

type SearchState = {
  debouncedText: string;
};

function SearchScreen() {
  const search$ = useObservable<SearchState>({
    debouncedText: '',
  });

  const coins$: ObservableComputed<Coin[]> = useComputed(() => {
    const coinToPriceArray = state$.coins.get();
    const searchInput = search$.debouncedText.get();

    if (!searchInput) return [];

    return coinToPriceArray.filter((coin) =>
      coin.name.toLowerCase().includes(searchInput.toLowerCase()),
    );
  });

  return (
    <View style={styles.container}>
      <Computed>
        <FlatList
          data={coins$.get()}
          ListHeaderComponent={
            <TextField
              debouncedText$={search$.debouncedText}
              placeholder='Search coins ...'
              showIcon
              autoFocus
            />
          }
          ListEmptyComponent={
            <EmptySearchList
              isShow={search$.debouncedText.get().length !== 0}
            />
          }
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
    paddingTop: '25%',
    paddingHorizontal: 15,
  },
  text: {
    color: WHITE,
  },
});
export default SearchScreen;
