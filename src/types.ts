import type { ReactNode } from "react";

export type DefaultArgument = string;

export type InferArgument<TCombineFunction extends () => unknown> =
	| Parameters<TCombineFunction>[number]
	| DefaultArgument;

export type ArgumentsOverrideFunction<TArg> = (
	args: TArg[],
) => (TArg | DefaultArgument)[];

export type ArgumentsOverrideProp<TArg> =
	| ArgumentsOverrideFunction<TArg>
	| Record<string, TArg[]>
	| TArg[]
	| undefined;

export type CascadeContext<TArg> = {
	argumentOverrideFunction: ArgumentsOverrideFunction<TArg>;
};

export type CombineFunction<TArg> = (...args: TArg[]) => string | undefined;

export type Cascade<TArg> = CombineFunction<TArg> & {
	Provider: (props: ProviderProps<TArg>) => ReactNode;
};

export type ProviderProps<TArg> = (
	| {
			args: ArgumentsOverrideProp<TArg>;
			className?: undefined;
	  }
	| {
			args?: undefined;
			className: string;
	  }
	| {
			args?: undefined;
			className?: undefined;
	  }
) & {
	children: ReactNode;
};
