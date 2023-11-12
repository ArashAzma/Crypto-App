import {Computed, useComputed} from '@legendapp/state/react';
import React, {useRef} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';

import CoinItem from './CoinItem';
import {state$} from '../GlobalState';
import {WHITE} from '../utils/Theme';

function CoinList() {
  const renderCount = ++useRef(0).current;
  const coinDataArray = useComputed(() => {
    const data = state$.coins.get();
    return Object.keys(data).map((key: string) => ({
      name: key,
      price: Number(data[key as keyof typeof data]),
    }));
  });
  return (
    <>
      <Text style={styles.renderText}>Coin List renders : {renderCount}</Text>
      <Computed>
        {() => (
          <FlatList
            data={coinDataArray.get()}
            contentContainerStyle={styles.flatlist}
            renderItem={({index}) => {
              return <CoinItem coin={coinDataArray[index]} />;
            }}
          />
        )}
      </Computed>
    </>
  );
}

const styles = StyleSheet.create({
  flatlist: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: WHITE,
  },
  renderText: {
    color: WHITE,
  },
});

export default CoinList;
