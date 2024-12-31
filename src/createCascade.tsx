import React, { createContext, use, useMemo } from "react";
import { CascadeValue } from "./cascadeValue";
import { computeCascadeValue } from "./computeCascadeValue";
import { computeClassName } from "./computeClassName";
import {
	Argument,
	Cascade,
	PostFunction,
	ProviderProps,
} from "./types";

export function createCascade(
	postFunction?: PostFunction,
): Cascade {
	const context = createContext(new CascadeValue());

	function consumer(...args: Argument[]) {
		const cascadeValueFromContext = use(context);
		const className = computeClassName(args, cascadeValueFromContext);

		if(!postFunction) {
			return className;
		}
		
		return postFunction(className);
	}

	function Provider({
		children,
		className,
	}: ProviderProps) {
		const cascadeValueFromContext = use(context);

		const value = useMemo(() => {
			return computeCascadeValue(className, cascadeValueFromContext);
		}, [className, cascadeValueFromContext]);

		return <context.Provider value={value}>{children}</context.Provider>;
	}

	return Object.assign(consumer, {
		Provider,
	});
}
