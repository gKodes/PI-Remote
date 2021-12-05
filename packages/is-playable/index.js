import path from "path";

const isPlayable = (source) => {
  return path.extname(filepath).slice(1).toLowerCase() in exts;
};

const isPlayableMime = (source) => {
  return path.extname(filepath).slice(1).toLowerCase() in exts;
};

export { isPlayable, isPlayableMime };
