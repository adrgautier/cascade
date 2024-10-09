import type { CascadeStyle, CascadeStyleFunction } from "./types";

export function createStyleFunction(style: CascadeStyle): CascadeStyleFunction {
	if (!style) {
		return (values) => values;
	}
	if (typeof style !== "function") {
		return (values) => ({ ...values, ...style });
	}
	return style;
}
