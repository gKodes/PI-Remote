import { Director } from "@rm/core";
import Fastify from "fastify";
import { viewerScripts } from "@rm/remote-render";
import socketioServer from "fastify-socket.io";
import replyFrom from "fastify-reply-from";
import { RenderManager } from "@rm/remote-render/RenderManager";
import { pipe, nth, split } from "ramda";
import { HIDController } from "../../remote-render/controller";

// await loadExtensions("/Users/kgadireddy/Desktop/kamal/dev/PI-Remote/packages");

// await fetch("https://www.youtube.com/watch?v=Keme8oxHHPQ");
// await fetch("https://www.ibomma.net/b/dhamaka-telugu-2021-watch-online.html");

const server = Fastify({
  logger: true,
});

const instance = new Director(
  "/Users/kgadireddy/Desktop/kamal/dev/PI-Remote/packages"
);

server.register(socketioServer);
server.register(replyFrom);

const getPage = (director, id) => {
  return director.getStage({ id })?.getPage();
};

server.post(
  "/stage",
  {
    schema: {
      body: {
        url: { type: "string" },
      },
    },
  },
  async (request, reply) => {
    const {
      body: { url },
    } = request;
    reply.send({
      id: (await instance.compose(url)).id,
    });
  }
);

server.get("/viewer.js", (request, reply) => {
  reply.type("text/javascript");
  reply.send(viewerScripts.socketio);
});

server.get(
  "/stage/:stageId/view",
  {
    schema: {
      querystring: {
        stageId: { type: "string" },
      },
    },
  },
  async (request, reply) => {
    const {
      params: { stageId },
    } = request;

    reply.type("text/html");
    reply.send(`<html>
    <head>
    <script>
        window.MIRROR_SERVICE = '${request.url}'
    </script>
    <script src="/viewer.js"></script>
    </head>
    <body>
    <h1>This space for rent</h1>
    </body>
    </html>`);
  }
);

server.get("/stage/:stageId/*", async (request, reply) => {
  const {
    params: { "*": resource, stageId },
  } = request;

  if (resource) {
    const page = getPage(instance, stageId);
    if (page) {
      const sourceURL = page.url();

      reply.from(resource, {
        getUpstream: () => sourceURL.url.origin,
        rewriteRequestHeaders: (req, headers) => {
          headers.referer = sourceURL.href;
          return headers;
        },
      });
    } else {
      reply.status(404);
    }
  }
});

const geStageIDFromPath = pipe(split("/"), nth(2));

server.ready(async () => {
  // await instance.init();
  // instance.compose("https://www.moneycontrol.com/markets/global-indices/");
  const attachNamespace = server.io.of(/^\/stage\/.+\/view$/);

  attachNamespace.on("connection", async (socket) => {
    console.info("Attaching ....");

    const stageId = geStageIDFromPath(socket.nsp.name);
    const page = getPage(instance, stageId);
    // stage.addAudience().on('*', (...args) => socket.emit(...args));
    // socket.on('disconnect', audience.leave);
    // socket.onAny((name, args) => audience[name](...args));
    if (page) {
      page.on(RenderManager.PAGE_EVENT_MESSAGE, (message) => {
        socket.emit(...message);
      });

      new HIDController(page, socket);
    }
  });
});

server.listen(4847, (err, address) =>
  console.log(`server listening on ${address}`)
);

// server.io.
