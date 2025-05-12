import { assertType, describe, test } from "vitest";
import { createCascade } from "../src";
import type { Cascade, CascadeMap } from "../src/types";

describe("createCascade", () => {
	test("without element", () => {
		const uniqueCascade = createCascade();
		assertType<Cascade>(uniqueCascade);
	});
	test("with options", () => {
		const unique = Symbol();
		type ArgType = typeof unique;
		const uniqueCascade = createCascade({ in: (a: ArgType) => "string" });
		assertType<Cascade<[ArgType]>>(uniqueCascade);
	});
	test("with elements", () => {
		const mapCascade = createCascade("elem1", "elem2");
		assertType<CascadeMap<"elem1" | "elem2">>(mapCascade);
	});
	test("with options and elements", () => {
		const unique = Symbol();
		type ArgType = typeof unique;
		const mapCascade = createCascade(
			{ in: (a: ArgType) => "string" },
			"elem1",
			"elem2",
		);
		assertType<CascadeMap<"elem1" | "elem2", [ArgType]>>(mapCascade);
	});
	test("with valid options", () => {
		createCascade({});
		createCascade({ in: (a: number) => "string" });
		createCascade({ in: (a: undefined) => "string" });
		createCascade({ out: (...args: string[]) => "string" });
	});
	test("with invalid options", () => {
		// @ts-expect-error
		createCascade({ in: (a: string) => 123 });
		// @ts-expect-error
		createCascade({ in: (a: string) => undefined });
		// @ts-expect-error
		createCascade({ out: (a: string) => 123 });
		// @ts-expect-error
		createCascade({ out: (a: string) => undefined });
		// @ts-expect-error
		createCascade({ out: (a: number) => "string" });
	});
});
