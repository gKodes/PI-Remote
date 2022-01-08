import { readOnlyProp } from "@rm/utils";
import { headersParser } from "./utils";

const RESPONSE_SYM = Symbol("Request.Response");

export class Request {
  constructor({ url, method, headers, response, intercept }) {
    const data = null; // TODO: Extract from post data
    // this.originType = initiator.type;

    Object.defineProperties(this, {
      intercept: readOnlyProp(intercept),
      url: readOnlyProp(new URL(url)),
      method: readOnlyProp(method),
      headers: readOnlyProp(headersParser(headers)),
      data: readOnlyProp(data),
    });

    /*
    url
    urlFragment
    method
    headers
    postData
    hasPostData
    postDataEntries
    */
    this[RESPONSE_SYM] = response;
    // response.request = this;

    Object.freeze(this);
  }

  // url = new URL with all the info
  // method = http method
  // headers = [{name: '', value: '' || []}]
  // data = request body
  // originType = initiator.type

  getResponse() {}

  continue() {}
}
