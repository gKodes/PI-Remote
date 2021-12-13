import { existsSync, readdirSync, readFileSync } from "fs";
import path from "path";
import {
  always,
  andThen,
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
      try {
        return {
          ...(await import(path.dirname(pkgJson.source))),
          config,
        };
      } catch (error) {
        console.info(error);
      }
    }
  }),
  bind(Promise.allSettled, Promise),
  andThen(filter(propEq("status", "fulfilled"))),
  andThen(map(prop("value")))
);

// console.info(
//   getExtensions("/Users/kgadireddy/Desktop/kamal/dev/PI-Remote/packages")
// );

const extractSourceWith = () => extensions[0].extractSource;

const loadExtensions = async (sourceDir) => {
  if (!extensions) {
    extensions = await getExtensions(sourceDir);
    console.info(extensions);
  }
};

export { getExtensions, extractSourceWith, loadExtensions };
