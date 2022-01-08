import {
  adjust,
  always,
  apply,
  compose,
  concat,
  converge,
  curryN,
  equals,
  flip,
  head,
  identity,
  ifElse,
  insert,
  map,
  mergeDeepLeft,
  nAry,
  not,
  nth,
  nthArg,
  of,
  otherwise,
  pipe,
  pluck,
  prop,
  slice,
  tail,
  type,
  unapply,
  useWith,
  when,
} from "ramda";

const isFunction = pipe(type, equals("Function"));
const isPropFunction = flip(pipe(prop, isFunction));

/**
 * @template T
 * Binds all methods on the instance to itself
 * 
 * @param {T} instance
 * 
 * @return {T}
 */
export const bindAll = converge(map, [
  useWith(when, [curryN(1, isPropFunction)]),
  identity,
]);

const isObject = pipe(type, equals("Object"));

// const withMeta = (meta, fn) => {
//   // return useWith(fn, [when]);
//   return (mergingObject, ...args) => {
//     return fn(
//       isObject(mergingObject)
//         ? mergeDeepLeft(meta, mergingObject)
//         : mergingObject,
//       ...args
//     );
//   };
// }; // converge

// [ifElse(isObject, mergeDeepLeft(meta), identity(meta))];

// unapply(ifElse(
//   pipe(head, isObject),
//   compose(concat, [of(meta), tail]),
//   concat(of(meta)), [of, ]
// ), apply(fn);

// const withMeta = pipe(
//   curryN(2, flip(head)),
//   ifElse(isObject, pipe(mergeDeepLeft, of), unapply(identity))
// );

const mergeOrPrefixFirst = converge(concat, [
  ifElse(
    converge(isObject, [pipe(nthArg(1), head)]),
    useWith(adjust(0), [mergeDeepLeft]),
    insert(0)
    // useWith(concat, [of, pipe(nthArg(0), of)])
  ),
  unapply(slice(2, Infinity)),
])

mergeOrPrefixFirst({}, ['']) // ?


const mergeOrPrefixFistArgument = converge(concat, [
  ifElse(
    curryN(2, flip(isObject)),
    pipe(mergeDeepLeft, of),
    useWith(concat, [of, pipe(nthArg(0), of)])
  ),
  unapply(slice(2, Infinity)),
])

mergeOrPrefixFistArgument({ meta: "data" })({sample: "test"}, "hello", "test"); // ?

const withMeta = curryN(2, (meta, fn) => {
  const appendMeta = mergeOrPrefixFistArgument(meta);

  return (...args) => fn(...appendMeta(meta, ...args))
});

converge(apply, [])

withMeta({meta: 'test'}, identity)({ message: 'error' }, "From") // ?

// useWith(unapply(identity), [converge(concat, [
//   mergeOrPrefixFistArgument,
//   unapply(slice(2, Infinity)),
// ]), identity])({meta: "test"}, identity) // ?
// // apply(fn)

// pluck("length", [mergeOrPrefixFistArgument, unapply(tail)]); // ?
// curryN(2, )

// useWith(concat, [of, nthArg(0)])({}, [1]); // ?

// withMeta({}, logger.error)

// mergeDeepLeft(meta)
