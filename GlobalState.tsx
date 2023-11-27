import {observable} from '@legendapp/state';

import {type CoinName} from './utils/Types';

type CoinToPriceMap = {[key: string]: number};
type PinnedCoin = {name: CoinName | null; priceHistory: number[]};
type Gender = 'Male' | 'Female' | null;

export const state$ = observable({
  coinToPriceMap: {} as CoinToPriceMap,
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
    gender: null as Gender,
    imageUrl: 'https://i.stack.imgur.com/34AD2.jpg',
  },
});
