import micromatch from "micromatch";
import {
  all,
  F,
  ifElse,
  isNil,
  path,
  unapply,
  useWith,
  prop,
  anyPass,
} from "ramda";
import { Operator } from "./operator";

const isMatchNotNill = ifElse(unapply(all(isNil)), micromatch.isMatch, F);

const originIsMatch = useWith(isMatchNotNill, [
  path(["url", "origin"]),
  prop("origin"),
]);
const mimeTypeIsMatch = useWith(isMatchNotNill, [
  path(["url", "origin"]),
  prop("mimeTypes"),
]);
const fileExtIsMatch = useWith(isMatchNotNill, [
  path(["url", "origin"]),
  prop("fileTypes"),
]);
const routeIsMatch = useWith(isMatchNotNill, [
  path(["url", "origin"]),
  prop("route"),
]);
// const originIsMatch = useWith(isMatch, [path(['url', 'origin']), prop('origin')]);
// const originIsMatch = useWith(isMatch, [path(['url', 'origin']), prop('origin')]);

// isMatch(url.origin, actorInfo.origin))

export class Crew extends Operator {
  static EVENT_RESOURCE_FOUND = "resourceFound";

  static isMatch = anyPass([
    originIsMatch,
    routeIsMatch,
    mimeTypeIsMatch,
    fileExtIsMatch,
  ]);

  constructor() {
    super(...arguments);
  }

  async init() {}

  async act() {
    throw new MethodNotImplemented("AbstractActor.act");
  }

  // To be invoked with a resource url or information to be fetched/processed by crew
  resourceFound(resourceURL) {
    this.emit(AbstractActor.EVENT_RESOURCE_FOUND, resourceURL);
  }
}
