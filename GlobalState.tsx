import {observable} from '@legendapp/state';
import {enableReactTracking} from '@legendapp/state/config/enableReactTracking';

import {type CoinName} from './utils/Types';

type CoinToPriceMap = {[key: string]: number};
type PinnedCoin = {name: CoinName; priceArray: number[]};

enableReactTracking({
  auto: true,
});

export const state$ = observable({
  coinToPriceMap: {} as CoinToPriceMap,
  fearAndGreedIndex: 0,
  pinnedCoin: {name: 'bitcoin', priceArray: []} as PinnedCoin,
});
