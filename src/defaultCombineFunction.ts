import type { DefaultValue } from "./types";

export const defaultCombineFunction = (...args: DefaultValue[]): string =>
	args.join(" ");
