import { TreeMirrorClient } from "mutation-summary";

const BINDING_NAME = "sendMessage";

const sendMessage = (function () {
  const binding = window[BINDING_NAME];
  // delete window[BINDING_NAME];

  // TODO: First arg would be event name and remaining would be event args
  return (...args) => {
    try {
      binding(JSON.stringify([null, args]));
    } catch (error) {
      console.error(error);
    }
  };
})();

const mirror = {
  initialize(rootId, children) {
    const baseURL = new URL(
      document.querySelector("base")?.href || location.pathname,
      location.origin
    );
    sendMessage("cast.setBase", [baseURL.toString()]);
    sendMessage("cast.initialize", [rootId, children]);
  },

  applyChanged(removed, addedOrMoved, attributes, text) {
    sendMessage("cast.applyChanged", [removed, addedOrMoved, attributes, text]);
  },
};

let mirrorClient;

const disconnect = () => mirrorClient.disconnect();
const initialize = () => (mirrorClient = new TreeMirrorClient(document, mirror));

initialize();
