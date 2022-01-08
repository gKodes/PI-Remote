import { curryN } from "ramda";
import { mergeOrPrefixFirst } from "@rm/utils";

export const withMeta = curryN(2, (meta, fn) => {
  const appendMeta = mergeOrPrefixFirst(meta);

  return (...args) => fn(...appendMeta(args));
});
