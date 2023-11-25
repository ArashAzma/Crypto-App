export function keysOf<Obj extends object>(o: Obj) {
  return Object.keys(o) as Array<keyof Obj>;
}
export function getDifferencePercent(x1: number, x2: number) {
  if (x1 === 0) return 0;

  const deltaX = x2 - x1;

  return (deltaX / x1) * 100;
}
