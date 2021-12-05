import { TreeMirrorClient } from "mutation-summary";

const mirror = {
  initialize(rootId, children) {
    const baseURL = new URL(
      document.querySelector("base")?.href || location.pathname,
      location.origin
    );
    cast("cast.setBase", [baseURL.toString()]);
    cast("cast.initialize", [rootId, children]);
  },

  applyChanged(removed, addedOrMoved, attributes, text) {
    cast("cast.applyChanged", [removed, addedOrMoved, attributes, text]);
  },
};

const mirrorClient = new TreeMirrorClient(document, mirror);

const disconnect = () => mirrorClient.disconnect();
