import type { DefaultValue } from './types';

export const defaultMergeFunction = (...args: DefaultValue[]): string =>
	args.join(" ");
