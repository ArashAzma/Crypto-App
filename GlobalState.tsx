import {observable} from '@legendapp/state';

import {Currency} from './utils/Types';
import {type CoinName} from './utils/Types';

type PinnedCoinName = CoinName | null;

type CoinToPriceMap = {[key: string]: number};
type PinnedCoin = {name: PinnedCoinName; priceArray: number[]};

export const state$ = observable({
  coinToPriceMap: {} as CoinToPriceMap,
  fearAndGreedIndex: 0,
  dollarPriceInRial: 0,
  pinnedCoin: {name: 'bitcoin', priceArray: []} as PinnedCoin,
});

export const settings$ = observable({
  currency: 'Dollar' as Currency,
});
