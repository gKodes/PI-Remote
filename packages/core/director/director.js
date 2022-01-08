import { loggerFor, withMeta } from "@rm/logger";
import { bindAll } from "@rm/utils";
import { nanoid } from "nanoid";
import { find, pipe } from "ramda";
import { getBrowser, getExtensions } from "..";
import { Stage } from "./stage";
const BROWSER_SYM = Symbol("director.browser");
const EXTENSIONS_SYM = Symbol("director.extension");

// TODO: Need to create our own Page Abstraction As the ID's change when navigated
class Director {
  constructor(extensionsDir) {
    Object.defineProperty(this, "id", {
      value: nanoid(),
      writable: false,
    });

    this.logger = loggerFor(this);
    this.stages = new Map();
    this.init = this.init.bind(this, extensionsDir);
    this.init();
  }

  async init(extensionsDir) {
    if (!this.init._cache) {
      this.logger.info("Loading Extensions From %s", extensionsDir);
      this.init._cache = (async () => {
        this[BROWSER_SYM] = await getBrowser();
        this[EXTENSIONS_SYM] = await getExtensions(extensionsDir);

        // TODO: Setup Crew Hooks
      })();
    }
    return this.init._cache;
  }

  async getPage({ id, url }) {
    const browser = this[BROWSER_SYM];
    let page;
    if (id) {
      page = find(
        pipe(invoker(0, "target"), propEq("_targetId", id)),
        await browser.pages()
      );
    }
    return page ?? browser.newPage();
  }

  getStage({ id }) {
    return this.stages.get(id);
  }

  getActor({ url, stage }) {
    // TODO: Identify whey we are getting duplicates
    return this[EXTENSIONS_SYM].actors[0].getInstance(stage);
  }

  getCrew({}) {}

  /**
   * The main method to used to fetch the Media Resource
   *
   * @param {*} url in which we need to search
   */
  async compose(url) {
    const stage = await Stage({ url, director: this });
    this.logger.info("Created stage [%s] for %s", stage.id, url);

    console.info(stage)

    const page = stage.getPage();
    this.stages.set(stage.id, stage);

    // TODO: replace this with an Stage event stage.screen.loaded
    page.on("framenavigated", (frame) => {
      // It can be a list of actors
      try {
        if (!frame.isDetached()) {
          const actor = stage.getActor({ url: frame.url() });
          actor
            .act({ frame })
            .catch(withMeta({ actor: actor.id }, stage.logger.error)); // .catch(log.error(``));
          // toObj('error'), { actor: actor.id, stage: stage.id }
        }
      } catch (error) {
        console.warn(`Error while acting ${error.message}`, error);
      }
    });

    // stage.on(Stage.EVENT_RESOURCE_FOUND, (request) => {
    //   console.info(request.url.toString());
    //   // Run Crew
    // });

    stage.play();

    return stage;
  }
}

export { Director };
