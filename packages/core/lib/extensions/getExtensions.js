/*
then [ { config: { type: 'actor', origin: '*' }, 
    filepath: '/Users/kgadireddy/Desktop/kamal/dev/PI-Remote/packages/actor-default/package.json' }, 
  { config:  
     { type: 'crew', 
       mimeTypes: [ 'video/*' ], 
       fileTypes: [ 'mp[0-9]', 'm3u([8]*)' ] }, 
    filepath: '/Users/kgadireddy/Desktop/kamal/dev/PI-Remote/packages/crew-default/package.json' } ] 
*/

import { andThen, construct, constructN, invoker, pipe, reduce } from "ramda";
import path from "path";
import pluralize from "pluralize";
import { getExtensionConfigs } from "./getExtensionConfigs";

const getExtensions = pipe(
  getExtensionConfigs,
  andThen(
    reduce(async (accumulatorPromise, { config, filepath }) => {
      const accumulator = await accumulatorPromise;
      const configDir = path.dirname(filepath);
      const { default: ExtensionType } = await import(configDir);
      const typePlural = pluralize(config.type);

      // TODO: Type Validation
      if (!accumulator[typePlural]) {
        accumulator[typePlural] = [];
      }

      accumulator[typePlural].push({
        ...config,
        getInstance: constructN(1, ExtensionType),
      });

      return accumulator;
    }, Promise.resolve({}))
  )
);

getExtensions; // ?
getExtensions("/Users/kgadireddy/Desktop/kamal/dev/PI-Remote/packages"); // ?

export { getExtensions };
