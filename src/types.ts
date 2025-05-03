import type { ReactNode, FC } from "react";
import { UniqueElement } from "./constants";
import { CascadeValue } from "./cascadeValue";

export type PostFunction = (classNameString: string) => string;

export type ConsumerFunction = (c: string) => string | undefined;

export type ProviderComponent = FC<ProviderProps>;

export type Cascade = [ConsumerFunction, ProviderComponent];

export type CascadeMap<TElement extends string> = [Record<TElement, ConsumerFunction>, Record<TElement, ProviderComponent>]

export type ProviderProps = {
	className: string;
	children: ReactNode;
	element?: string | UniqueElement;
};

export type BoundThis = {
	element?: string,
	context: React.Context<CascadeValue>,
}

export type LiteralString<T> = string extends T ? never: unknown;