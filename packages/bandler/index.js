/* main bundler */

const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser"); // parses and returns AST
const traverse = require("@babel/traverse").default; // walks through AST
const babel = require("@babel/core"); // main babel functionality
const detective = require("detective");
const resolve = require("enhanced-resolve");
const { ResolvedByTarget } = require("./resolver/plugins/ResolveByTarget");

const defaultConfig = {
  extensions: [".browser.js", ".js", ".json"],
  conditionNames: ["import", "default"],
};

// engine.io-client

/*
 * Given filePath, read and parses module, returns module information
 * Module information includes:
 * - module ID
 * - module filePath
 * - all dependencies used in the module (in array form)
 * - code inside the module
 */
function createModuleInfo(filePath, localCache) {
  const content = fs.readFileSync(filePath, "utf-8");
  const cjsDeps = detective(content);
  let deps = [];
  let code;
  let isES6;

  if (cjsDeps.length === 0) {
    const ast = parser.parse(content, {
      sourceType: "module",
    });
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        deps.push(node.source.value);
      },
      ExportDeclaration: ({ node }) => {
        if (Array.isArray(node.specifiers) && node.specifiers.length) {
          if (node.source) deps.push(node.source.value);
        }
      },
    });
    //TODO: Make that configurable
    code = babel.transformFromAstSync(ast, null, {
      presets: ["@babel/preset-env"],
    }).code;
    isES6 = true;
  } else {
    deps = cjsDeps;
    code = content;
    isES6 = false;
  }
  const id = localCache.id++;

  return {
    id,
    filePath,
    deps,
    code,
    isES6,
  };
}

/*
 * Given entry path,
 * returns an array containing information from each module
 */
function createDependencyGraph(entry, { resolver }) {
  const localCache = { id: 0 };
  const entryInfo = createModuleInfo(entry, localCache);
  const graphArr = [];
  graphArr.push(entryInfo);
  for (const module of graphArr) {
    module.map = {};
    module.deps.forEach((depPath) => {
      const baseDir = path.dirname(module.filePath);
      const resolvedPath = resolver(baseDir, depPath);
      let moduleInfo = graphArr.find(({ filePath }) => filePath === resolvedPath)
      if (!moduleInfo) {
        moduleInfo = createModuleInfo(resolvedPath, localCache);
        graphArr.push(moduleInfo);
      }
      module.map[depPath] = moduleInfo.id;
    });
  }
  return graphArr;
}

/*
 * Given an array containing information from each module
 * return a bundled code to run the modules
 */
function pack(graph) {
  // TODO: Make it no es6
  const isES6 = graph[0].isES6;
  const moduleArgArr = graph.map((module) => {
    return `${module.id}: {
        factory: (exports, module, require) => {
          ${module.code}
        },
        map: ${JSON.stringify(module.map)}
      }`;
  });

  const iifeBundler = `(function(modules){
      const require = id => {
        let {factory, map, exports} = modules[id];
        const localRequire = requireDeclarationName => require(map[requireDeclarationName]);

        if (!exports) {
          const module = { exports: {} };
          factory(module.exports, module, localRequire);
          exports = modules[id].exports = module.exports
        }

        return exports;
      } 
      require(0);
    })({${moduleArgArr.join()}})
    `;
  return iifeBundler;
}

const DEFAULT_CONFIG = {
  target: "browser",
  babelConfig: {
    presets: ["@babel/preset-env"],
  },
};

const bundler = (entryFilePath, config) => {
  let { resolver, target, babelConfig } = { ...DEFAULT_CONFIG, ...config };
  if (!resolver && target) {
    resolver = resolve.create.sync({
      ...defaultConfig,
      plugins: [new ResolvedByTarget(target)],
    });
  }
  const graph = createDependencyGraph(entryFilePath, { resolver, babelConfig });
  const bundle = pack(graph);
  return bundle;
};

module.exports = bundler;
