import { loadExtensions, fetch, getPage } from "@rm/core";
import Fastify from "fastify";
import { viewerScripts } from "@rm/remote-render";
import socketioServer from "fastify-socket.io";
import replyFrom from "fastify-reply-from";
import { HIDController } from "../../remote-render/controller";

// await loadExtensions("/Users/kgadireddy/Desktop/kamal/dev/PI-Remote/packages");

// await fetch("https://www.youtube.com/watch?v=Keme8oxHHPQ");
// await fetch("https://www.ibomma.net/b/dhamaka-telugu-2021-watch-online.html");

const server = Fastify({
  logger: true,
});

server.register(socketioServer);
server.register(replyFrom);

server.post(
  "/get",
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
      id: await fetch(url),
    });
  }
);

server.get("/viewer.js", (request, reply) => {
  reply.type("text/javascript");
  reply.send(viewerScripts.socketio);
});

server.get(
  "/attach/:sessionId",
  {
    schema: {
      querystring: {
        sessionId: { type: "string" },
      },
    },
  },
  async (request, reply) => {
    const {
      params: { sessionId },
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

server.get("/attach/:sessionId/*", async (request, reply) => {
  const {
    params: { "*": resource, sessionId },
  } = request;

  if (resource) {
    const page = await getPage(sessionId);
    if (page) {
      const sourceURL = new URL(page.url());

      reply.from(resource, {
        getUpstream: () => sourceURL.origin,
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

server.ready(() => {
  const attachNamespace = server.io.of(/^\/attach\/.+$/);

  attachNamespace.on("connection", async (socket) => {
    console.info("Attaching ....");

    const [_, __, sessionId] = socket.nsp.name.split("/");
    const page = await getPage(sessionId);
    if (page) {
      socket.emit("cast.clearPage", []);
      page.on("cast", (message) => {
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
