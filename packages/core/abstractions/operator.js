import { EventEmitter } from "events";
import { nanoid } from "nanoid";
import { readOnlyProp } from "@rm/utils";
import { flatten, mergeDeepRight, reduce } from "ramda";

export class Operator extends EventEmitter {
  // super(...Operator.withConfig(...arguments, { storageOf: Storage.MEDIA }))
  static withConfig() {
    const list = Array.isArray(arguments[0])
      ? flatten(arguments)
      : Array.prototype.slice.call(arguments, 0);

    return list.length > 1
      ? [list[0], reduce(mergeDeepRight, {}, tail(list))]
      : list;
  }

  constructor(stage, { storageOf } = {}) {
    super();
    Object.defineProperties(this, {
      id: readOnlyProp(nanoid()),
      stage: readOnlyProp(stage),
      store: readOnlyProp(stage.getStore(storageOf)),
    });
  }
}
