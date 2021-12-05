import { existsSync, readdirSync, readFileSync } from "fs";
import path from "path";
import {
  always,
  andThen,
  apply,
  bind,
  compose,
  converge,
  filter,
  invoker,
  map,
  partialRight,
  pipe,
  prop,
  propEq,
} from "ramda";

let extensions;

const probablePackageJsonPath = (rootPath) =>
  converge(path.join, [always(rootPath), prop("name"), always("package.json")]);

const listAllDir = compose(
  filter(invoker(0, "isDirectory")),
  partialRight(readdirSync, [{ withFileTypes: true }])
);

const readJSON = (source) => ({
  ...JSON.parse(readFileSync(source, { encoding: "utf-8" })),
  source,
});

const configProp = prop("@rd");

const getExtensions = pipe(
  converge(map, [probablePackageJsonPath, listAllDir]),
  filter(existsSync),
  map(readJSON),
  filter(configProp),
  map(async (pkgJson) => {
    const config = configProp(pkgJson);
    if (config) {
      return {
        ...(await import(path.dirname(pkgJson.source))),
        config,
      };
    }
  }),
  bind(Promise.allSettled, Promise),
  andThen(filter(propEq("status", "fulfilled"))),
  andThen(map(prop("value")))
);

// console.info(
//   getExtensions("/Users/kgadireddy/Desktop/kamal/dev/PI-Remote/packages")
// );

const getFetchWith = () => extensions[0].fetchWith;

const loadExtensions = async (sourceDir) => {
  if (!extensions) {
    extensions = await getExtensions(sourceDir);
  }
};

export { getExtensions, getFetchWith, loadExtensions };
