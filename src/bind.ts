import { MergeFunction } from "./types";

export function bind<TValue>(mergeFunction: (this: Record<string, string>, ...args: TValue[]) => string, binding: Record<string, string>): MergeFunction<TValue> {
    return mergeFunction.bind(binding);
}