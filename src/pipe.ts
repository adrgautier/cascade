export const pipe =
	<TValue>(a: (v: TValue) => TValue, b: (v: TValue) => TValue) =>
	(v: TValue): TValue =>
		b(a(v));
