import type {
	ArgumentsOverrideFunction,
	ArgumentsOverrideProp,
	DefaultArgument,
} from "./types";

/**
 * Transform the provider props into the override function passed into the context.
 */
export function createArgumentOverrideFunction<TArg>(
	prop: ArgumentsOverrideProp<TArg | DefaultArgument> | undefined,
): ArgumentsOverrideFunction<TArg | DefaultArgument> {
	if (!prop) {
		return (inheritedArgs) => [...inheritedArgs];
	}

	if (typeof prop === "string") {
		return (inheritedArgs) => [...inheritedArgs, prop];
	}

	if (Array.isArray(prop)) {
		return (inheritedArgs) => [...inheritedArgs, ...prop];
	}

	if (typeof prop === "object") {
		return (inheritedArgs) =>
			Object.entries(prop).reduce(
				(acc, [target, additionalArgs]) => {
					if (
						inheritedArgs.some(
							(inheritedArg) =>
								typeof inheritedArg === "string" &&
								inheritedArg.includes(target),
						)
					) {
						if (typeof additionalArgs === "string") {
							acc.push(additionalArgs);
						} else {
							acc.push(...additionalArgs);
						}
					}
					return acc;
				},
				[...inheritedArgs],
			);
	}

	return prop;
}
