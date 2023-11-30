import {observable} from '@legendapp/state';

import {type Coin, type CoinName} from './utils/Types';

type PinnedCoin = {name: CoinName | null; priceHistory: number[]};

export const state$ = observable({
  coins: [] as Coin[],
  fearAndGreedIndex: 0,
  dollarPriceInToman: 0,
  pinnedCoin: {name: 'bitcoin', priceHistory: []} as PinnedCoin,
});

export const settings$ = observable({
  isCurrencyDollar: false,
  showPinnedCoin: true,
});
