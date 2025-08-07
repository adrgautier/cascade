import type { FC, ReactNode } from "react";
import type { CascadeValue } from "./cascadeValue";

export type ConsumerFunction<TArgs extends readonly unknown[] = [string]> = (
	...args: TArgs
) => string;

export type ProviderComponent = FC<ProviderProps>;

export type Cascade<TArgs extends readonly unknown[] = [string]> = [
	ConsumerFunction<TArgs>,
	ProviderComponent,
];

export type CascadeMap<
	TElement extends string,
	TArgs extends readonly unknown[] = [string],
> = [
	{ [e in TElement]: ConsumerFunction<TArgs> },
	{ [e in TElement]: ProviderComponent },
];

export type ProviderProps = {
	className: string;
	children: ReactNode;
};

export type ConsumerThis<TArgs extends readonly unknown[]> = {
	context: React.Context<CascadeValue>;
	element?: string;
	options: Options<TArgs>;
};

export type ProviderThis = {
	context: React.Context<CascadeValue>;
	element?: string;
};

export type Options<TInArgs extends readonly unknown[] = unknown[]> = {
	in?: (...args: TInArgs) => string;
	out?: (a: string) => string;
};

export type LiteralString<T> = string extends T ? never : unknown;
