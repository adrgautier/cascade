import { splitClassName } from "./splitClassName";
import { ExtendedArgument } from "./types";

type AddFn = (className: string, predicate?: string) => void;

export function resolveValue (addFn: AddFn, args: ExtendedArgument) {
	if (!args) return;

	if (typeof args === 'string') {
		resolveString(addFn, args);
	} else if (Array.isArray(args)) {
		resolveArray(addFn, args);
	} else if (typeof args === 'object') {
		resolveObject(addFn, args);
	}
}

export function resolveString (addFn: AddFn, string: string) {
	const parts = splitClassName(string);
	const length = parts.length;

	for (let i = 0; i < length; i++) {
		addFn(parts[i]);
	}
}

export function resolveArray (addFn: AddFn, array: ExtendedArgument[]) {
	for (let i = 0; i < array.length; i++) {
		resolveValue(addFn, array[i]);
	}
}

export function resolveObject (addFn: AddFn, object: Record<string, string | boolean>) {
	for (const k in object) {
		const v = object[k];
        if(v === true) {
			addFn(k);
        }
		else if (typeof v === 'string') {
			addFn(v, k);
		}
	}
}