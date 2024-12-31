import { CascadeValue } from "./cascadeValue";
import { resolveArray } from "./resolvers";
import { Argument } from "./types";

/**
 * On the Consumer, compute the className from the arguments and the cascade value from the context.
 * @param args Argument[]
 * @param cascadeValueFromContext CascadeValue
 * @returns string
 */
export function computeClassName(args: Argument[], cascadeValueFromContext: CascadeValue): string {
	let classNameFromArgs = "";
	let classNameFromMatchContext = "";

	function addToClassName(className: string) {
		classNameFromArgs = classNameFromArgs ? `${classNameFromArgs} ${className}` : className;

		if(className in cascadeValueFromContext.match) {
			classNameFromMatchContext = classNameFromMatchContext ? `${classNameFromMatchContext} ${cascadeValueFromContext.match[className]}` : cascadeValueFromContext.match[className];
		}
	}

	resolveArray(addToClassName, args);

	const classNameArray = [];

	if(classNameFromArgs) {
		classNameArray.push(classNameFromArgs);
	}

	if(cascadeValueFromContext.common) {
		classNameArray.push(cascadeValueFromContext.common);
	}

	if(classNameFromMatchContext) {
		classNameArray.push(classNameFromMatchContext);
	}

	return classNameArray.join(" ");
}

