import { TreeMirror } from "mutation-summary";

var _base;

const delegate = {
  createElement(tagName) {
    if (tagName == "SCRIPT") {
      const node = document.createElement("NO-SCRIPT");
      node.style.display = "none";
      return node;
    }

    if (tagName == "HEAD") {
      const node = document.createElement("HEAD");
      node.appendChild(document.createElement("BASE"));
      node.firstChild.href = `${window.location.href}/`;
      return node;
    }

    if (tagName == "BASE") {
      return document.createElement("ORG-BASE");
    }
  },
};

const mirror = new TreeMirror(document, delegate);
mirror.setBase = (base) => (_base = base);
mirror.clearPage = () => {
  while (document.firstChild) {
    document.removeChild(document.firstChild);
  }
};

export { mirror };
