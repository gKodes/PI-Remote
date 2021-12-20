import { fileURLToPath } from "url";
import { toLower } from "ramda";
import { getBrowser } from "@rm/core";
import UAParser from "ua-parser-js";
import path from "path";
import bundler from "@rm/bandler";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTEXT_NAME = "__mirror_scripts__";

const getSourceInjectionScript = async (puppeteerBrowser) => {
  puppeteerBrowser = puppeteerBrowser || (await getBrowser());
  const { browser } = UAParser(await puppeteerBrowser.version());
  const { cache } = getSourceInjectionScript;
  const cacheKey = `${browser.name}-${browser.version}`;

  if (!cache[cacheKey]) {
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

    cache[cacheKey] = bundler(path.resolve(__dirname, "./source/index.js"), {
      babelConfig,
    });
  }

  return cache[cacheKey];
};

getSourceInjectionScript.cache = {};

// TODO: Check if page already has name context and if so invoke - connect
// TODO: Move the blow logic into ints owen file
// TODO: Handle Navigation Events

// https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-createIsolatedWorld
// https://github.com/puppeteer/puppeteer/issues/2671
export class RenderManager {
  static CONTEXT_BINDING_FN_NAME = "sendMessage";
  static PAGE_EVENT_MESSAGE = "message";

  static async create(page) {
    if (!page._renderManager) {
      const instance = new RenderManager(page);
      await instance.initialize();
      page._renderManager = instance;
    }
    return page._renderManager;
  }

  constructor(page) {
    this.page = page;
    this.page.on("framenavigated", () => {
      console.info("Frame Navigated");
      this.executionContextId = null;
      this.attach();
    });
  }

  async initialize() {
    this.mainFrame = await this.page.mainFrame();
    this.client = await this.page.target().createCDPSession();
  }

  async attach() {
    if (!this.executionContextId) {
      this.page.emit(RenderManager.PAGE_EVENT_MESSAGE, ["cast.clearPage"]);

      const isolatedContext = await this.client.send(
        "Page.createIsolatedWorld",
        {
          worldName: CONTEXT_NAME,
          frameId: this.mainFrame._id,
        }
      );

      this.executionContextId = isolatedContext.executionContextId;

      // TODO: Make this more generic so that we can use it to pass back and fourth more message
      await this.client.send("Runtime.addBinding", {
        name: RenderManager.CONTEXT_BINDING_FN_NAME,
        executionContextId: this.executionContextId,
      });
      console.info(`${this.mainFrame.url()} Binding Done`);

      // TODO:
      this.client.on("Runtime.bindingCalled", ({ name, payload }) => {
        if (name === RenderManager.CONTEXT_BINDING_FN_NAME) {
          const [eventName = "cast", args] = JSON.parse(payload);
          this.page.emit(RenderManager.PAGE_EVENT_MESSAGE, args);
        }
      });

      // fs.writeFileSync("./debug.js", sourceInjectionScript, { encoding: "utf-8" });
      // NOTE: Using raw client as `evaluateHandle` does not execute string as function
      await this.client.send("Runtime.callFunctionOn", {
        functionDeclaration: `function() { ${await getSourceInjectionScript(
          await this.page.browser()
        )} }`,
        executionContextId: this.executionContextId,
      });
      console.info(`${this.mainFrame.url()} Runtime Injected`);
    } else {
      await client.send("Runtime.evaluate", {
        expression: "initialize();",
        contextId: this.executionContextId,
      });
    }

    return this.detach.bind(this);
  }

  async detach() {
    return this.client.send("Runtime.evaluate", {
      expression: "disconnect();",
      contextId: this.executionContextId,
    });
  }
}
