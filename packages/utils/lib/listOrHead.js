import { equals, head, identity, pipe, ifElse, length } from "ramda";

export const listOrHead = ifElse(pipe(length, equals(1)), head, identity);
