import { createContext, createElement, use, useContext } from "react";
import { CascadeValue } from "./cascadeValue";
import {
	ConsumerThis,
	ProviderThis,
	Cascade,
	CascadeMap,
	ConsumerFunction,
	LiteralString,
	ProviderComponent,
	ProviderProps,
	Options,
} from "./types";
import { UniqueElement } from "./constants";

function ProviderComponent(
	this: ProviderThis,
	{ children, className }: ProviderProps,
) {
	const element = this.element || UniqueElement;
	const context = this.context;
	const cascadeValueFromContext = useContext(context);
	const value = cascadeValueFromContext.extend(element, className);

	return createElement(context.Provider, { children, value });
}

function consumerFunction<TArgs extends any[]>(
	this: ConsumerThis<TArgs>,
	...args: NoInfer<TArgs>
) {
	const element = this.element || UniqueElement;
	const cascadeValueFromContext = use(this.context);
	const { in: inFunction, out: outFunction } = this.options;

	let className =
		typeof inFunction === "function"
			? inFunction(...args)
			: (args[0] as string);

	const classNameFromCascade = cascadeValueFromContext.get(element);

	if (classNameFromCascade) {
		className = `${className} ${classNameFromCascade}`;
	}

	return typeof outFunction === "function"
		? outFunction(className)
		: className;
}

export function createCascade(): Cascade;

export function createCascade<TInArgs extends any[] = [string]>(
	options: Options<TInArgs>,
): Cascade<TInArgs>;

export function createCascade<
	TElement extends string & LiteralString<TElement>,
>(...elements: readonly TElement[]): CascadeMap<TElement>;

export function createCascade<
	TElement extends string & LiteralString<TElement>,
	TInArgs extends any[] = [string],
>(
	options: Options<TInArgs>,
	...elements: readonly TElement[]
): CascadeMap<TElement, TInArgs>;

export function createCascade(
	...args: [void | Options | string, ...string[]]
): Cascade | CascadeMap<string> {
	const context = createContext(new CascadeValue());

	const options: Options<any[]> = {};
	let elements: string[];

	if (typeof args[0] === "object") {
		const [optionArgs, ...elementArgs] = args;
		options.in = optionArgs.in;
		options.out = optionArgs.out;
		elements = elementArgs;
	} else {
		elements = args as string[];
	}

	if (elements?.length) {
		const consumerFunctions = {} as Record<string, ConsumerFunction>;
		const ProviderComponents = {} as Record<string, ProviderComponent>;

		elements.forEach((element) => {
			consumerFunctions[element] = consumerFunction.bind({
				context,
				element,
				options,
			});
			ProviderComponents[element] = ProviderComponent.bind({
				context,
				element,
			});
		});

		return [consumerFunctions, ProviderComponents];
	}

	return [
		consumerFunction.bind({ context, options }),
		ProviderComponent.bind({ context }),
	];
}
