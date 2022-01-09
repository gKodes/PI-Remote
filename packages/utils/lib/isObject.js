import { equals, pipe, type } from "ramda";

export const isObject = pipe(type, equals("Object"));
