import React, { createContext, use, useMemo } from "react";
import type {
	CascadeContext,
	Cascade,
	InferArgument,
	DefaultArgument,
	CombineFunction,
	ProviderProps,
} from "./types";
import { defaultCombineFunction } from "./defaultCombineFunction";
import { createArgumentOverrideFunction } from "./createArgumentOverrideFunction";
import { pipe } from "./pipe";

export function createCascade<
	TCombineFunction extends CombineFunction<DefaultArgument>,
>(
	customCombineFunction?: TCombineFunction,
): Cascade<InferArgument<TCombineFunction>> {
	const combineFunction = customCombineFunction || defaultCombineFunction;

	const context = createContext<
		CascadeContext<InferArgument<TCombineFunction>>
	>({
		argumentOverrideFunction: createArgumentOverrideFunction(undefined),
	});

	function consumer(...values: InferArgument<TCombineFunction>[]) {
		const { argumentOverrideFunction } = use(context);
		return combineFunction(...argumentOverrideFunction(values));
	}

	function Provider({
		children,
		className,
	}: ProviderProps<InferArgument<TCombineFunction>>) {
		const { argumentOverrideFunction: parentArgumentOverrideFunction } =
			use(context);

		const argumentOverrideFunction = useMemo(
			() =>
				pipe(
					createArgumentOverrideFunction(className),
					parentArgumentOverrideFunction,
				),
			[className, parentArgumentOverrideFunction],
		);

		const value = useMemo(
			() => ({
				argumentOverrideFunction,
			}),
			[argumentOverrideFunction],
		);

		return <context.Provider value={value}>{children}</context.Provider>;
	}

	return Object.assign(consumer, {
		Provider,
	});
}
