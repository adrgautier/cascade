import { CombineFunction } from "./types";

export function bind<TValue>(
	combineFunction: (this: Record<string, string>, ...args: TValue[]) => string,
	binding: Record<string, string>,
): CombineFunction<TValue> {
	return combineFunction.bind(binding);
}
