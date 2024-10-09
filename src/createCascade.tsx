import React, { createContext, CSSProperties, use, useMemo } from "react";
import {
	CascadeContext,
	CascadeObject,
	CascadeValue,
	DefaultValue,
	MergeFunction,
	ProviderProps,
} from "./types";
import { defaultMergeFunction } from "./defaultMergeFunction";
import { createClassNameFunction } from "./createClassNameFunction";
import { createStyleFunction } from "./createStyleFunction";
import { pipe } from "./pipe";

export function createCascade<
	TMergeFunction extends MergeFunction<DefaultValue>
>(customMergeFunction?:TMergeFunction): CascadeObject<CascadeValue<TMergeFunction>> {
	const mergeFunction = customMergeFunction || defaultMergeFunction;

	const context = createContext<CascadeContext<CascadeValue<TMergeFunction>>>({
		className: createClassNameFunction(undefined),
		style: createStyleFunction(undefined),
	});

	function useClassName(...values: (CascadeValue<TMergeFunction>)[]) {
		const { className } = use(context);
		return mergeFunction(...className(values));
	}

	function useStyle(value: CSSProperties) {
		const { style } = use(context);
		return style(value);
	}

	function Provider({
		className,
		style,
		children,
	}: ProviderProps<CascadeValue<TMergeFunction>>) {
		const { className: contextClassNameFunction, style: contextStyleFunction } =
			use(context);

		const classNameFunction = useMemo(
			() => pipe(createClassNameFunction(className), contextClassNameFunction),
			[className, contextClassNameFunction],
		);

		const styleFunction = useMemo(
			() => pipe(createStyleFunction(style), contextStyleFunction),
			[style, contextStyleFunction],
		);

		const value = useMemo(
			() => ({
				className: classNameFunction,
				style: styleFunction,
			}),
			[classNameFunction, styleFunction],
		);

		return <context.Provider value={value} children={children} />;
	}

	return Object.assign(useClassName, {
		style: useStyle,
		Provider,
	});
}
