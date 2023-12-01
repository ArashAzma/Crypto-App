import {observable} from '@legendapp/state';
import {
  configureObservablePersistence,
  persistObservable,
} from '@legendapp/state/persist';
import {ObservablePersistMMKV} from '@legendapp/state/persist-plugins/mmkv';

import {type Gender, type Coin, type CoinName} from './utils/Types';

type PinnedCoin = {name: CoinName | null; priceHistory: number[]};

configureObservablePersistence({
  pluginLocal: ObservablePersistMMKV,
});

export const state$ = observable({
  coins: [] as Coin[],
  fearAndGreedIndex: 0,
  dollarPriceInToman: 0,
  pinnedCoin: {name: 'bitcoin', priceHistory: []} as PinnedCoin,
});

export const settings$ = observable({
  isCurrencyDollar: false,
  showPinnedCoin: true,
  user: {
    firstName: 'Arash',
    lastName: 'Azma',
    gender: undefined as Gender,
    imageUrl: 'https://i.stack.imgur.com/34AD2.jpg',
  },
});

persistObservable(settings$, {
  local: 'settings',
});
