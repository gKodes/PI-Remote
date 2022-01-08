import { Operator } from "./operator";

export class Actor extends Operator {
  static EVENT_RESOURCE_FOUND = "resourceFound";

  constructor() {
    super(...arguments);
  }

  async init() {}

  async act() {
    throw new MethodNotImplemented("AbstractActor.act");
  }

  getStore(type) {
    return this.stage.getStore(type);
  }

  // To be invoked with a resource url or information to be fetched/processed by crew
  // resourceFound(resourceURL) {
  //   this.emit(AbstractActor.EVENT_RESOURCE_FOUND, resourceURL);
  // }
}

/*
Utilities

MediaStorage.get()

storeMedia(metadata, url|stream|buffer)
store
*/
