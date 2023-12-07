import {ObservableObject} from '@legendapp/state';

import {GREEN, RED} from './Theme';

export function keysOf<Obj extends object>(o: Obj) {
  return Object.keys(o) as Array<keyof Obj>;
}
export function getDifferencePercent(x1: number, x2: number) {
  if (x1 === 0) return 0;

  const deltaX = x2 - x1;

  return (deltaX / x1) * 100;
}

export function capitalize(str: string) {
  if (!str) return '';

  return str?.at(0)?.toUpperCase() + str?.slice(1);
}
export function calculatePercentageAndColorViaValues(
  currentValue: number,
  previousValue: number,
  item$: ObservableObject<{
    percentage: number;
    color: string;
    isPinned: boolean;
  }>,
) {
  const calculatedPercentage = getDifferencePercent(
    previousValue,
    currentValue,
  );
  const roundedPercentage = Number(calculatedPercentage.toPrecision(2));

  item$.percentage.set(roundedPercentage);
  item$.color.set(calculatedPercentage > 0 ? GREEN : RED);
}
