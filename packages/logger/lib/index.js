import pino from "pino";
import path from "path";
import {
  type,
  pipe,
  equals,
  objOf,
  converge,
  mergeRight,
  reduce,
  unapply,
  bind,
  prop,
  identity,
  when,
  toLower,
} from "ramda";
import { bindAll } from "@rm/utils";

const LOGS_DESTINATION = "./logs";

const isString = pipe(type, equals("String"));

const transport = (name) => ({
  transport: {
    targets: [
      {
        target: "pino/file",
        options: {
          destination: path.join(LOGS_DESTINATION, `${name}.error`),
          mkdir: true,
        },
        level: "error",
      },
      {
        target: "pino/file",
        options: {
          destination: path.join(LOGS_DESTINATION, name),
          mkdir: true,
        },
      },
    ],
  },
});

const pinoOptionsFromString = converge(unapply(reduce(mergeRight, {})), [
  objOf("name"),
  transport,
]);

export function logger(options, destination) {
  options = isString(options) ? pinoOptionsFromString(options) : options;
  return pino(
    options, // ?
    destination
  );
}

export const application = logger("application");
export const access = logger("access");
access.byStage = pipe(
  objOf("stage"),
  bind(access.child, access),
  converge(bind, [prop("info"), identity])
);

export const loggerFor = (thisObj, metaData) =>
  bindAll(
    application.child({
      srouce: thisObj.constructor.name,
      [toLower(thisObj.constructor.name)]: thisObj.id,
      ...metaData,
    })
  );
application.for = loggerFor;

export * from "./withMeta";
