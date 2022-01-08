import { readOnlyProp } from "@rm/utils";
import { headersParser } from "./utils";

export class Response {
  constructor({ status, url, statusText, headers, intercept }) {
    Object.defineProperties(this, {
      intercept: readOnlyProp(intercept),
      url: readOnlyProp(new URL(url)),
      status: readOnlyProp(status),
      statusText: readOnlyProp(statusText),
      headers: readOnlyProp(headersParser(headers)),
    });
  }

  // Use Got
  async getBody() {}
}
