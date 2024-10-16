import type { DefaultArgument } from "./types";

/**
 * Simplest way to generate the value of the class attribute.
 * This combine function only supports one or multiple strings as arguments.
 */
export const defaultCombineFunction = (...args: DefaultArgument[]): string =>
	args.join(" ");
