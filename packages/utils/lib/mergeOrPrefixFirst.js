import {
  adjust,
  equals,
  head,
  ifElse,
  insert,
  last,
  mergeDeepLeft,
  pipe,
  type,
  unapply,
  useWith,
} from "ramda";

const isObject = pipe(type, equals("Object"));

export const mergeOrPrefixFirst = ifElse(
  pipe(unapply(last), head, isObject),
  useWith(adjust(0), [mergeDeepLeft]),
  insert(0)
);
