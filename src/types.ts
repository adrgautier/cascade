import type { ReactNode, FC } from "react";
import { UniqueElement } from "./constants";
import { CascadeValue } from "./cascadeValue";

export type ConsumerFunction<TArgs extends any[] = [string]> = (
	...args: TArgs
) => string | undefined;

export type ProviderComponent = FC<ProviderProps>;

export type Cascade<TArgs extends any[] = [string]> = [
	ConsumerFunction<TArgs>,
	ProviderComponent,
];

export type CascadeMap<
	TElement extends string,
	TArgs extends any[] = [string],
> = [
	{ [e in TElement]: ConsumerFunction<TArgs> },
	{ [e in TElement]: ProviderComponent },
];

export type ProviderProps = {
	className: string;
	children: ReactNode;
	element?: string | UniqueElement;
};

export type ConsumerThis<TArgs extends any[]> = {
	context: React.Context<CascadeValue>;
	element?: string;
	options: Options<TArgs>;
};

export type ProviderThis = {
	context: React.Context<CascadeValue>;
	element?: string;
};

export type Options<TInArgs extends any[] = [string]> = {
	in?: (...args: TInArgs) => string;
	out?: (a: string) => string;
};

export type LiteralString<T> = string extends T ? never : unknown;
