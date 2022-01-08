import { attachRenderer } from "@rm/remote-render";
import { getPageId } from "..";
import { getPage } from "./browser";

class Request {
  constructor({requestId, initiator, request}, client) {
    this.requestId = requestId;
    this.url = new URL(request.url); // TODO: Add Fragment
    this.method = request.method;
    this.headers = request.headers; // TODO: Transform to the needed structure
    this.data = null; // TODO: Extract from post data
    this.originType = initiator.type;

    /*
    url
    urlFragment
    method
    headers
    postData
    hasPostData
    postDataEntries
    */

    Object.freeze(this);
  }

  // url = new URL with all the info
  // method = http method
  // headers = [{name: '', value: '' || []}]
  // data = request body
  // originType = initiator.type

  getResponse() {}
}

class Response {
  getBody() {}
}


const fetch = async (source) => {
  const page = await getPage();
  await page.setRequestInterception(true);

  page.on("request", (request) => {
    request.continue();
  });

  // page.on("requestfinished", async (request) => {
  //   console.info({
  //     url: request.url(),
  //     resourceType: request.resourceType(),
  //     // responseHeaders: request.response()?.headers(),
  //   });
  // });

  // TODO: Blob Extractor
  // page._client.on("Network.requestWillBeSent", async ({ requestId, request }) => {
  //   console.info(request.url);
  //   if (request.url.startsWith("blob:")) {
  //     const response = await page._client.send("Network.getResponseBody", {
  //       requestId,
  //     });
  //     console.info(response);
  //   }
  // });

  await page.goto(source, {
    waitUntil: "domcontentloaded", // "load"
  });

  // await _(url, { page });
  // TODO: Setup Hooks and hand it over

  console.info(`${page.url()} -- Dom Content Loaded`);

  // await fetchWith(source, { page });
  // await attachRenderer(page);
  // const fetchWith = getFetchWith(source);

  // other actions...
  // await page.close();
  return getPageId(page);
};

export { fetch };

// is-video
// await fetchPlaybackSource("https://www.ibomma.net/b/dhamaka-telugu-2021-watch-online.html")
