import {
  filter,
  map,
  identity,
  split,
  pipe,
} from "ramda";
import { listOrHead } from "@rm/utils";

export const headersParser = pipe(
  map(pipe(split(/[\r\n]+/), filter(identity), listOrHead)),
  Object.freeze
);
