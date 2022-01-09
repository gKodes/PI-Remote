import { constructN, when } from "ramda";
import { isString } from "./isString";

export const asUrl = when(isString, constructN(1, URL))