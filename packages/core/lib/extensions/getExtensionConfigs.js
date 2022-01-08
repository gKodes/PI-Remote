import {
  allPass,
  andThen,
  bind,
  converge,
  filter,
  identity,
  map,
  objOf,
  partial,
  pipe,
  prop,
  propEq,
} from "ramda";
import { cosmiconfig } from "cosmiconfig";
import { listAllDirs } from "../utils";

const MODULE_NAME = "rd";

// memoizeWith(identity
const getComsicInstance = converge(partial(cosmiconfig, [MODULE_NAME]), [
  objOf("stopDir"),
  // TODO: Limit to package json
]);

const searchAllDirsForConfigs = converge(map, [
  pipe(getComsicInstance, converge(bind, [prop("search"), identity])),
  listAllDirs,
]);

const getExtensionConfigs = pipe(
  searchAllDirsForConfigs,
  bind(Promise.allSettled, Promise),
  andThen(
    pipe(
      filter(allPass([propEq("status", "fulfilled"), prop("value")])),
      map(prop("value"))
    )
  )
);

// getExtensionConfigs("/Users/kgadireddy/Desktop/kamal/dev/PI-Remote/packages"); // ?

export { getExtensionConfigs };
