import { CSSProperties, ReactNode } from "react";

export type DefaultValue = string;

export type CascadeValue<TMergeFunction extends (...args: any) => any> = Parameters<TMergeFunction>[number] | DefaultValue;

export type CascadeClassNameFunction<TValue> = (values: TValue[]) => TValue[];

export type CascadeClassName<TValue> =
	| CascadeClassNameFunction<TValue>
	| Record<string, TValue[] | string>
	| TValue[]
	| string
	| undefined;

export type CascadeStyleFunction = (value: CSSProperties) => CSSProperties;

export type CascadeStyle = CascadeStyleFunction | CSSProperties | undefined;

export type CascadeContext<TValue> = {
	className: CascadeClassNameFunction<TValue>;
	style: CascadeStyleFunction;
};

export type MergeFunction<TValue> = (...values: TValue[]) => string | undefined;

export type CascadeObject<TValue> = MergeFunction<TValue> & {
	style: (value: CSSProperties) => CSSProperties;
	Provider: (props: ProviderProps<TValue>) => ReactNode;
};

export type ProviderProps<TValue> = {
	className?: CascadeClassName<TValue>;
	style?: CascadeStyle;
	children: ReactNode;
};
