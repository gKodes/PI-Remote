import { fileURLToPath } from "url";
import bundler from "@rm/bandler";
import path from "path";
import { RenderManager } from "./RenderManager";
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
  if (config?.viewport) {
    page.emulate({
      options: {
        viewport: config?.viewport,
      },
    });
  }

  const renderManager = await RenderManager.create(page);
  await renderManager.attach();

  return () => renderManager.detach();
};

// console.info(await attachRenderer());

const viewerScripts = {
  socketio: bundler(path.resolve(__dirname, "./viewer/index.js")),
};

export { attachRenderer, viewerScripts };
