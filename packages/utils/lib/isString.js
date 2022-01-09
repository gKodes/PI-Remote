import { equals, pipe, type } from "ramda";

export const isString = pipe(type, equals("String"));
