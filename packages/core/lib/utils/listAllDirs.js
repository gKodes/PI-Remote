import { readdirSync } from "fs";
import path from "path";
import {
  chain,
  filter,
  invoker,
  map,
  partial,
  partialRight,
  pipe,
  prop,
} from "ramda";

const listAllDirs = chain(
  (list) => (source) => map(partial(path.join, [source]))(list),
  pipe(
    partialRight(readdirSync, [{ withFileTypes: true }]),
    filter(invoker(0, "isDirectory")),
    map(prop("name"))
  )
);

export { listAllDirs };
