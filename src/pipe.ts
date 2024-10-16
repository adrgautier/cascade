/**
 * Create a new function from two function.
 * The second function is called using the result of the first function.
 * @param a
 * @param b
 */
export const pipe =
	<TValue>(a: (v: TValue) => TValue, b: (v: TValue) => TValue) =>
	(v: TValue): TValue =>
		b(a(v));
