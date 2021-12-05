/* main bundler */

const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser"); // parses and returns AST
const traverse = require("@babel/traverse").default; // walks through AST
const babel = require("@babel/core"); // main babel functionality
const detective = require("detective");

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
function createDependencyGraph(entry) {
  const localCache = { id: 0 };
  const entryInfo = createModuleInfo(entry, localCache);
  const graphArr = [];
  graphArr.push(entryInfo);
  for (const module of graphArr) {
    module.map = {};
    module.deps.forEach((depPath) => {
      // TODO: Change to resolve js
      const baseDir = path.dirname(module.filePath);
      const resolvedPath =
        depPath[0] === "." ? path.join(baseDir, depPath) : depPath;

      const baseModuleDir = require.resolve(resolvedPath, {
        paths: require.resolve.paths(baseDir),
      });
      const absPath = path.resolve(baseModuleDir);

      const moduleInfo = createModuleInfo(absPath, localCache);
      graphArr.push(moduleInfo);
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
  const isES6 = graph[0].isES6;
  const moduleArgArr = graph.map((module) => {
    let exportsStatement;
    if (isES6) {
      exportsStatement = "exports";
    } else {
      exportsStatement = "module";
    }
    return `${module.id}: {
        factory: (${exportsStatement}, require) => {
          ${module.code}
        },
        map: ${JSON.stringify(module.map)}
      }`;
  });

  let factoryExportsStatement;
  if (isES6) {
    factoryExportsStatement = "module.exports";
  } else {
    factoryExportsStatement = "module";
  }

  const iifeBundler = `(function(modules){
      const require = id => {
        const {factory, map} = modules[id];
        const localRequire = requireDeclarationName => require(map[requireDeclarationName]); 
        const module = {exports: {}};
        
        factory(${factoryExportsStatement}, localRequire); 
        return module.exports; 
      } 
      require(0);
    })({${moduleArgArr.join()}})
    `;
  return iifeBundler;
}

const bundler = (entryFilePath) => {
  const graph = createDependencyGraph(entryFilePath);
  const bundle = pack(graph);
  return bundle;
};

module.exports = bundler;
