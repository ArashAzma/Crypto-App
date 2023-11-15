import {observable} from '@legendapp/state';
import {enableReactTracking} from '@legendapp/state/config/enableReactTracking';
enableReactTracking({
  auto: true,
});
export const state$ = observable({
  coinToPriceMap: {},
});
