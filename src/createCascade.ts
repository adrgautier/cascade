import { createContext, createElement, use, useContext } from "react";
import { CascadeValue } from "./cascadeValue";
import {
	BoundThis,
	Cascade,
	CascadeMap,
	ConsumerFunction,
	LiteralString,
	ProviderComponent,
	ProviderProps,
} from "./types";
import { UniqueElement } from "./constants";

function ProviderComponent(this: BoundThis, {
	children,
	className
}: ProviderProps) {
	const element = this.element || UniqueElement;
	const context = this.context;
	const cascadeValueFromContext = useContext(context);
	const value = cascadeValueFromContext.extend(element, className);

	return createElement(context.Provider, { children, value });
}

function consumerFunction(this: BoundThis, className: string) {
	const element = this.element || UniqueElement;
	const cascadeValueFromContext = use(this.context);
	return `${className} ${cascadeValueFromContext.get(element)}`;
}

export function createCascade(elements?: readonly never[]): Cascade;

export function createCascade<TElement extends string & LiteralString<TElement>>(elements?: readonly TElement[]): CascadeMap<TElement>;

export function createCascade<TElement extends string>(elements?: readonly TElement[]): Cascade | CascadeMap<TElement> {
	const context = createContext(new CascadeValue());

	if(elements?.length) {
		const consumerFunctions = {} as Record<TElement, ConsumerFunction>;
		const ProviderComponents = {} as Record<TElement, ProviderComponent>;

		elements.forEach((element) => {
			consumerFunctions[element] = consumerFunction.bind({ context, element: element });
			ProviderComponents[element] = ProviderComponent.bind({ context, element: element });
		})
			
		return [consumerFunctions, ProviderComponents];
	}

	return [consumerFunction.bind({ context }), ProviderComponent.bind({ context })];
}
