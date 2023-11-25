import {observable} from '@legendapp/state';

import {type CoinName} from './utils/Types';

type CoinToPriceMap = {[key: string]: number};
type PinnedCoin = {name: CoinName | null; priceHistory: number[]};

export const state$ = observable({
  coinToPriceMap: {} as CoinToPriceMap,
  fearAndGreedIndex: 0,
  dollarPriceInToman: 0,
  pinnedCoin: {name: 'bitcoin', priceHistory: []} as PinnedCoin,
});

export const settings$ = observable({
  isCurrencyDollar: false,
  showPinnedCoin: true,
});
