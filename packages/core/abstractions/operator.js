import { EventEmitter } from "events";
import { nanoid } from "nanoid";
import { readOnlyProp } from "@rm/utils";

export class Operator extends EventEmitter {
  constructor(stage, manager) {
    super();
    Object.defineProperties(this, {
      id: readOnlyProp(nanoid()),
      stage: readOnlyProp(stage),
      manager: this.getStore(manager),
    });
  }
}