export class Intercept {
  constructor(client, { interceptionId, requestId }) {
    this.requestId = requestId;
    this.interceptionId = interceptionId;
    Object.freeze(this);
  }
}