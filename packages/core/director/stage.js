import {
  assoc,
  bind,
  construct,
  memoizeWith,
  partial,
  pipe,
  prop,
  useWith,
} from "ramda";
import modelo from "modelo";
import { nanoid } from "nanoid";
import { EventEmitter } from "events";
import { Request, Response, Intercept } from "../lib";
import { access, loggerFor } from "@rm/logger";
import { readOnlyProp } from "@rm/utils";

const EXTENSIONS_SYM = Symbol.for("director.extension");

async function Stage({ url, director }) {
  if (this instanceof Stage) {
    EventEmitter.call(this);
    Object.defineProperty(this, "id", {
      value: nanoid(),
      writable: false,
    });

    const logger = (this.logger = loggerFor(this, {
      director: director.id,
    }));

    const sourceUrl = Object.freeze(new URL(url));
    const page = await director.getPage({ url });
    const logAccess = access.byStage(this.id);

    await page.setRequestInterception(true);

    page.on("request", (request) => {
      request.continue();
    });

    // TODO: may be use weekRef here
    const client = await page.target().createCDPSession();

    await client.send("Network.setRequestInterception", {
      patterns: [{ interceptionStage: "HeadersReceived" }],
    });

    const toIntercept = partial(construct(Intercept), [client]);

    client.on(
      "Network.requestIntercepted",
      ({
        interceptionId,
        request,
        requestId,
        responseStatusCode: status,
        responseHeaders,
        responseErrorReason,
      }) => {
        logAccess({ url: request.url });
        const intercept = toIntercept({ interceptionId, requestId });

        if (!responseErrorReason) {
          this.emit(
            Stage.EVENT_RESOURCE_FOUND,
            new Request({
              intercept,
              ...request,
              response: new Response({
                url: request.url,
                status,
                headers: responseHeaders,
                intercept,
              }),
            })
          );
        }

        client.send("Network.continueInterceptedRequest", { interceptionId });
      }
    );

    /* TODO: For blob requests
    client.on("Network.requestWillBeSent", async ({ requestId, request }) => {
      access.info({ url: request.url }, "Test");
      // if (request.url.startsWith("blob:")) {
      //   const response = await page._client.send("Network.getResponseBody", {
      //     requestId,
      //   });
      //   console.info(response);
      // }
    });
    */

    // access

    // memoizeWith(), pipe(construct(URL))
    this.getActor = memoizeWith(
      pipe(prop("url"), construct(URL), prop("hostname")),
      useWith(bind(director.getActor, director), [assoc("stage", this)])
    );

    // pipe(
    //   prop("url"),
    //   construct(URL),
    //   compose(find, [
    //     pipe(prop("hostname"), curryN(2, isMatch)),
    //     always(prop("actors", extensions)),
    //   ])
    // );

    Object.defineProperties(this, {
      sourceUrl: readOnlyProp(sourceUrl),
      url: {
        get: () => new URL(page.url()),
      },
      client: readOnlyProp(url),
    });

    this.getPage = () => page;
    this.play = () => page.goto(url);

    return this;
  }

  return Stage.call(Object.create(Stage.prototype), ...arguments);
}

modelo.inherits(Stage, EventEmitter);

Stage.prototype.addAudience = function () {
  // TODO: remote render
};

Stage.EVENT_RESOURCE_FOUND = Symbol("Stage.event.resourceFound");
Stage.EVENT_NEED_USER_INTERVENTION = Symbol("Stage.event.needUserIntervention");
Stage.EVENT_ON_SCREEN = Symbol("Stage.event.onScreen");

export { Stage };
