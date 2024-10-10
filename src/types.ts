import { ReactNode } from "react";

export type DefaultValue = string;

export type CascadeValue<TCombineFunction extends (...args: any) => any> =
	| Parameters<TCombineFunction>[number]
	| DefaultValue;

export type CascadeClassNameFunction<TValue> = (values: TValue[]) => TValue[];

export type CascadeClassName<TValue> =
	| CascadeClassNameFunction<TValue>
	| Record<string, TValue[] | string>
	| TValue[]
	| string
	| undefined;

export type CascadeContext<TValue> = {
	className: CascadeClassNameFunction<TValue>;
};

export type CombineFunction<TValue> = (
	...values: TValue[]
) => string | undefined;

export type CascadeObject<TValue> = CombineFunction<TValue> & {
	Provider: (props: ProviderProps<TValue>) => ReactNode;
};

export type ProviderProps<TValue> = {
	className: CascadeClassName<TValue>;
	children: ReactNode;
};
