import { attachRenderer } from "@rm/remote-render";
import { getPageId } from "..";
import { getPage } from "./browser";
import { extractSourceWith } from "./extensions";

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
