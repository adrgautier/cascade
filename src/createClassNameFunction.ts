import type { DefaultValue, CascadeClassName, CascadeClassNameFunction } from "./types";

export function createClassNameFunction<TValue>(
	className: CascadeClassName<TValue | DefaultValue>,
): CascadeClassNameFunction<TValue | DefaultValue> {
	if (!className) {
		return (values) => values;
	}

	if (typeof className === "string") {
		return (values) => [...values, className];
	}
	
	if (Array.isArray(className)) {
		return (values) => [...values, ...className];
	}

	if (typeof className === "object") {
		return (values) => Object.entries(className).reduce((acc, [target, additionalValues]) => {
			if (values.some(value => value === target)) {
				if(typeof additionalValues === "string") {
					return [...acc, additionalValues];
				}
				return [...acc, ...additionalValues];
			}
			return acc;
		}, [...values]);
	}
	return className;
}
