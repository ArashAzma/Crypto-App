import {observable} from '@legendapp/state';
import {enableReactTracking} from '@legendapp/state/config/enableReactTracking';

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

enableReactTracking({
  auto: true,
});
export const state$ = observable({
  coinToPriceMap: {} as CoinToPriceMap,
  fearAndGreedIndex: 0,
  pinnedCoin: 'bitcoin' as CoinName,
});
