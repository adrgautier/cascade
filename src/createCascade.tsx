import React, { createContext, use, useMemo } from "react";
import {
	CascadeContext,
	CascadeObject,
	CascadeValue,
	DefaultValue,
	CombineFunction,
	ProviderProps,
} from "./types";
import { defaultCombineFunction } from "./defaultCombineFunction";
import { createClassNameFunction } from "./createClassNameFunction";
import { pipe } from "./pipe";

export function createCascade<
	TCombineFunction extends CombineFunction<DefaultValue>,
>(
	customCombineFunction?: TCombineFunction,
): CascadeObject<CascadeValue<TCombineFunction>> {
	const combineFunction = customCombineFunction || defaultCombineFunction;

	const context = createContext<CascadeContext<CascadeValue<TCombineFunction>>>(
		{
			className: createClassNameFunction(undefined),
		},
	);

	function consumer(...values: CascadeValue<TCombineFunction>[]) {
		const { className } = use(context);
		return combineFunction(...className(values));
	}

	function Provider({
		className,
		children,
	}: ProviderProps<CascadeValue<TCombineFunction>>) {
		const { className: contextClassNameFunction } = use(context);

		const classNameFunction = useMemo(
			() => pipe(createClassNameFunction(className), contextClassNameFunction),
			[className, contextClassNameFunction],
		);

		const value = useMemo(
			() => ({
				className: classNameFunction,
			}),
			[classNameFunction],
		);

		return <context.Provider value={value} children={children} />;
	}

	return Object.assign(consumer, {
		Provider,
	});
}
