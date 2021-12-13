import { prop, pipe, propEq, invoker, find, path } from "ramda";
import puppeteer from "puppeteer-extra";
import executablePath from "chrome-location";

import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

const getBrowser = async () => {
  const { _cache: cache } = getBrowser;
  if (!(cache && cache.isConnected())) {
    getBrowser._cache = await puppeteer.launch({
      executablePath,
      headless: false, // Change this to env
      args: [
        "--no-sandbox",
        // "--disable-web-security",
        // "--disable-features=IsolateOrigins,site-per-process",
      ],
    });
  }

  return getBrowser._cache;
};

const getPage = async (id) => {
  const browser = await getBrowser();
  if (id) {
    // console.info(browser.pages())

    const page = find(
      pipe(invoker(0, "target"), propEq("_targetId", id)),
      await browser.pages()
    );

    return page;
  }
  return await browser.newPage();
};

const getPageId = pipe(invoker(0, "target"), prop("_targetId"));

// path(['_client', '_sessionId'])

export { getPage, getBrowser, getPageId };

// is-video
// await fetchPlaybackSource("https://www.ibomma.net/b/dhamaka-telugu-2021-watch-online.html")
