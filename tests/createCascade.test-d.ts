import { assertType, describe, test } from "vitest";
import classNames from "classnames";
import classNamesBind from "classnames/bind";
import { twMerge, type ClassNameValue } from "tailwind-merge";
import { createCascade, bind } from "../src";
import type { Cascade } from "../src/types";

describe("createCascade", () => {
	test("default merge", () => {
		const defaultCascade = createCascade();
		assertType<Cascade<string>>(defaultCascade);
		defaultCascade("foo", "bar");
	});
	test("classNames merge", () => {
		const classNamesCascade = createCascade(classNames);
		assertType<Cascade<classNames.Argument>>(classNamesCascade);
		classNamesCascade("foo", ["bar"], true, false, null, 1, undefined, {
			baz: true,
		});
	});
	test("classNames (bind) merge", () => {
		const style = { class: "class_123456789" };
		const classNamesBindCascade = createCascade(bind(classNamesBind, style));
		assertType<Cascade<classNames.Argument>>(classNamesBindCascade);
		classNamesBindCascade("foo", ["bar"], true, false, null, 1, undefined, {
			baz: true,
		});
	});
	test("tailwind merge", () => {
		const twMergeCascade = createCascade(twMerge);
		assertType<Cascade<ClassNameValue>>(twMergeCascade);
		twMergeCascade("foo", ["bar", "baz"], null);
	});
	test("invalid merge", () => {
		const invalidMerge = (...values: number[]) => values.join("");
		// @ts-expect-error merge function must accept strings
		createCascade(invalidMerge);
	});
});
