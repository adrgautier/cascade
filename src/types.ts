import type { ReactNode } from "react";

export type PostFunction = (classNameString: string) => string;

export type SimpleMapping = Record<string, boolean>;

export type MatchMapping = Record<string, string>;

export type Argument = string | boolean | undefined | null | SimpleMapping | Argument[];

export type ExtendedArgument = Argument | MatchMapping | ExtendedArgument[];

export type ConsumerFunction = (...args: Argument[]) => string | undefined;

export type Cascade = ConsumerFunction & {
	Provider: (props: ProviderProps) => ReactNode;
};

export type ProviderProps = {
	className: ExtendedArgument;
	children: ReactNode;
};
