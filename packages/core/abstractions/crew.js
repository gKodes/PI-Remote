import { EventEmitter } from "events";

export class Crew extends EventEmitter {
  static EVENT_RESOURCE_FOUND = "resourceFound";

  constructor(stage) {
    super();
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
