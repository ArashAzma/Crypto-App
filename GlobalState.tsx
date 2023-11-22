import {observable} from '@legendapp/state';

import {Currency} from './utils/Types';

type CoinToPriceMap = {[key: string]: number};
type CoinName =
  | 'bitcoin'
  | 'ethereum'
  | 'bnb'
  | 'xrp'
  | 'solana'
  | 'cardano'
  | 'dogecoin'
  | 'tron'
  | 'fantom'
  | 'litecoin';
export const state$ = observable({
  coinToPriceMap: {} as CoinToPriceMap,
  fearAndGreedIndex: 0,
  dollarPriceInRial: 0,
  pinnedCoin: 'bitcoin' as CoinName,
});

export const settings$ = observable({
  currency: 'Dollar' as Currency,
});
