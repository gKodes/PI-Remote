const { parse, format } = require("path");

const HOOK = "resolve";

const extractPathInfo = (path) => {
  const parsedPath = parse(path);

  return {
    source: format({
      ...parsedPath,
      ext: '',
      base: '',
    }),
    ext: parsedPath.ext,
  };
};

const existsSync = (fs, path) => {
  try {
    fs.statSync(path);
    return true;
  } catch {}
  return false;
};

function ResolvedByTarget(targetEnv) {
  return {
    /**
     * @param {Resolver} resolver the resolver
     * @returns {void}
     */
    apply(resolver) {
      const target = resolver.ensureHook(HOOK);
      const fs = resolver.fileSystem;
      resolver
        .getHook(HOOK)
        .tapAsync("ResolvedByTarget", (request, resolveContext, callback) => {
          const { path, request: name } = request;
          const { source, ext } = extractPathInfo(name);
          const envSpecificSource = `${source}.${targetEnv}${ext}`;
          if (existsSync(fs, resolver.join(path, envSpecificSource))) {
            return resolver.doResolve(
              target,
              {
                ...request,
                request: envSpecificSource,
              },
              `using path ${resolver.join(path, envSpecificSource)}`,
              resolveContext,
              callback
            );
          }
          callback();
        });
    },
  };
}

module.exports = { ResolvedByTarget };

/*

resolver.plugin("resolve", function ResolveByTarge(request, callback) {
      if (request.request === "something") {
        const mappingContent = fs.readFileSync(mappingLocation, "utf8");
        const result = path.resolve(
          `./src/${mappingContent.split(":")[1].trim()}.js`
        );
        const relativeResult = `./${path.relative(
          path.dirname(request.context.issuer),
          result
        )}`;

        const nextRequest = Object.assign({}, request, {
          request: relativeResult,
        });

        const message = "I'd buy that for a dollar!";
        resolver.doResolve("resolve", nextRequest, message, callback);
      } else {
        callback();
      }
*/