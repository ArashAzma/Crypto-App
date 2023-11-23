export function keysOf<Obj extends object>(o: Obj) {
  return Object.keys(o) as Array<keyof Obj>;
}
