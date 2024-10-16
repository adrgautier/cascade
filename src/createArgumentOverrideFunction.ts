import type { ArgumentsOverrideFunction, ArgumentsOverrideProp } from "./types";

/**
 * Transform the provider props into the override function passed into the context.
 */
export function createArgumentOverrideFunction<TArg>({
	className,
	args,
}: {
	args: ArgumentsOverrideProp<TArg> | undefined;
	className: string | undefined;
}): ArgumentsOverrideFunction<TArg> {
	if (className) {
		return (inheritedArgs) => [...inheritedArgs, className];
	}

	if (!args) {
		return (inheritedArgs) => [...inheritedArgs];
	}

	if (Array.isArray(args)) {
		return (inheritedArgs) => [...inheritedArgs, ...args];
	}

	if (typeof args === "object") {
		return (inheritedArgs) =>
			Object.entries(args).reduce(
				(acc, [target, additionalArgs]) => {
					if (inheritedArgs.some((value) => value === target)) {
						acc.push(...additionalArgs);
					}
					return acc;
				},
				[...inheritedArgs],
			);
	}

	return args;
}
