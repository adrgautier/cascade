import { assertType, describe, test } from "vitest";
import { createCascade } from "../src";
import type { Cascade, CascadeMap } from "../src/types";

describe("createCascade", () => {
	test("without element", () => {
		const uniqueCascade = createCascade();
		assertType<Cascade>(uniqueCascade);
	});
	test("without element 2", () => {
		const uniqueCascade = createCascade([]);
		assertType<Cascade>(uniqueCascade);
	});
	test("with elements", () => {
		const mapCascade = createCascade(['elem1', 'elem2']);
		assertType<CascadeMap<'elem1' | 'elem2'>>(mapCascade);
	});
});
