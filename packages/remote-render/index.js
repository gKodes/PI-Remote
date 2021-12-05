import { fileURLToPath } from "url";
import { toLower } from "ramda";
import UAParser from "ua-parser-js";
import bundler from "@rm/bandler";
import path from "path";
import fs from "fs";
// export { controller } from "./controller";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @typedef AttachRendererConfig
 * @type {object}
 * @property {import('puppeteer').Viewport} viewport
 */

/**
 * Attach an remote renderer to the page by injecting the scripts
 * and providing and event for callback
 *
 * @param {import('puppeteer').Page} page
 * @param {AttachRendererConfig} config
 */
const attachRenderer = async (page, config) => {
  if (page._pageBindings.has('cast')) {
    return;
  }

  const frame = await page.mainFrame();
  const { browser } = UAParser(await page.browser().version());

  const babelConfig = {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            [toLower(browser.name)]: browser.version,
          },
        },
      ],
    ],
  };

  const sourceInjectionScript = bundler(
    path.resolve(__dirname, "./source/index.js"),
    babelConfig
  );

  if (config?.viewport) {
    page.emulate({
      options: {
        viewport: config?.viewport,
      },
    });
  }

  const handler = await frame.evaluateHandle("");
  // TODO: Figure out a better way to bind function to the given context only or else try to do random function so its hard to detect
  await page.exposeFunction("cast", (...args) => page.emit("cast", args));

  fs.writeFileSync('./debug.js', sourceInjectionScript, { encoding: 'utf-8' })

  // NOTE: Using raw client as `evaluateHandle` does not execute string as function
  await frame._client.send("Runtime.callFunctionOn", {
    functionDeclaration: `function() { ${sourceInjectionScript} }`,
    executionContextId: handler._context._contextId,
  });
};

// console.info(await attachRenderer());

const viewerScripts = {
  socketio: bundler(path.resolve(__dirname, "./viewer/socketio.js"))
}

export { attachRenderer, viewerScripts };
