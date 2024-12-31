import { CascadeValue } from "./cascadeValue";
import { resolveValue } from "./resolvers";
import { ExtendedArgument } from "./types";

/**
 * On a Provider, compute the cascade value from the className and the cascade value from the context.
 * @param className ExtendedArgument
 * @param cascadeValueFromContext CascadeValue
 * @returns CascadeValue
 */
export function computeCascadeValue(className: ExtendedArgument, cascadeValueFromContext: CascadeValue): CascadeValue {
	const cascadeValue = new CascadeValue(cascadeValueFromContext);

	function addToCascade(className: string, predicate?: string) {
        if(!predicate) {
            cascadeValue.addCommon(className);
        } else {
			cascadeValue.addMatch(className, predicate);
		}
    }

	resolveValue(addToCascade, className);

	return cascadeValue;
}
