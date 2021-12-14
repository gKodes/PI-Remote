import { fileURLToPath } from "url";
import { toLower } from "ramda";
import UAParser from "ua-parser-js";
import bundler from "@rm/bandler";
import path from "path";
import fs from "fs";
// export { controller } from "./controller";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTEXT_NAME = "__mirror_scripts__";

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
  if (page._pageBindings.has("cast")) {
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
    { babelConfig }
  );

  if (config?.viewport) {
    page.emulate({
      options: {
        viewport: config?.viewport,
      },
    });
  }

  // TODO: Check if page already has name context and if so invoke - connect
  // TODO: Move the blow logic into ints owen file
  // TODO: Handle Navigation Events

  // https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-createIsolatedWorld
  // https://github.com/puppeteer/puppeteer/issues/2671
  const client = await page.target().createCDPSession();
  const isolatedContext = await client.send("Page.createIsolatedWorld", {
    worldName: CONTEXT_NAME,
    frameId: frame._id,
  });

  const CONTEXT_BINDING_FN_NAME = "sendMessage";

  // TODO: Make this more generic so that we can use it to pass back and fourth more message
  await client.send("Runtime.addBinding", {
    name: CONTEXT_BINDING_FN_NAME,
    executionContextId: isolatedContext.executionContextId,
  });
  console.info(`${frame.url()} Binding Done`);

  client.on(
    "Runtime.bindingCalled",
    ({ name, payload }) => {
      if (name === CONTEXT_BINDING_FN_NAME) {
        const [eventName = "cast", args] = JSON.parse(payload);
        page.emit("cast", args);
      }
    }
  );

  // fs.writeFileSync("./debug.js", sourceInjectionScript, { encoding: "utf-8" });
  // NOTE: Using raw client as `evaluateHandle` does not execute string as function
  await client.send("Runtime.callFunctionOn", {
    functionDeclaration: `function() { ${sourceInjectionScript} }`,
    executionContextId: isolatedContext.executionContextId,
  });
  console.info(`${frame.url()} Runtime Injected`);

  // await client.send("Runtime.evaluate", {
  //   expression: "initialize();",
  //   contextId: isolatedContext.executionContextId,
  // })

  return async () =>
    client.send("Runtime.evaluate", {
      expression: "disconnect();",
      contextId: isolatedContext.executionContextId,
    });
};

// console.info(await attachRenderer());

const viewerScripts = {
  socketio: bundler(path.resolve(__dirname, "./viewer/index.js")),
};

export { attachRenderer, viewerScripts };
