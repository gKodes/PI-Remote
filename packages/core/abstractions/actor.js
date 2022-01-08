import { EventEmitter } from "events";
import { nanoid } from "nanoid";

export class Actor extends EventEmitter {
  static EVENT_RESOURCE_FOUND = "resourceFound";

  constructor(stage) {
    super();
    Object.defineProperty(this, "id", {
      value: nanoid(),
      writable: false,
    });
    
    this.stage = stage;
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
