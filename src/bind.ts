import type { CombineFunction } from "./types";

/**
 * Bind an object to the provided combine function.
 * @param combineFunction
 * @param objectToBind
 * @example
 * ```ts
 * import classNames from "classnames/bind";
 * import styles from "./Component.module.css";
 *
 * const cc = createCascade(bind(classNames, styles));
 * ```
 */
export function bind<TValue>(
	combineFunction: (this: Record<string, string>, ...args: TValue[]) => string,
	objectToBind: Record<string, string>,
): CombineFunction<TValue> {
	return combineFunction.bind(objectToBind);
}
