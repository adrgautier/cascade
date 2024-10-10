import { assertType, describe, test } from "vitest";
import classNames from "classnames";
import classNamesBind from "classnames/bind";
import { twMerge, ClassNameValue } from "tailwind-merge";
import { createCascade, bind } from "../src";
import { CascadeObject } from "../src/types";

describe("createCascade", () => {
	test("default merge", () => {
		const defaultCascade = createCascade();
		assertType<CascadeObject<string>>(defaultCascade);
		defaultCascade("foo", "bar");
	});
	test("classNames merge", () => {
		const classNamesCascade = createCascade(classNames);
		assertType<CascadeObject<classNames.Argument>>(classNamesCascade);
		classNamesCascade("foo", ["bar"], true, false, null, 1, undefined, {
			baz: true,
		});
	});
	test("classNames (bind) merge", () => {
		const style = { class: "class_123456789" };
		const classNamesBindCascade = createCascade(bind(classNamesBind, style));
		assertType<CascadeObject<classNames.Argument>>(classNamesBindCascade);
		classNamesBindCascade("foo", ["bar"], true, false, null, 1, undefined, {
			baz: true,
		});
	});
	test("tailwind merge", () => {
		const twMergeCascade = createCascade(twMerge);
		assertType<CascadeObject<ClassNameValue>>(twMergeCascade);
		twMergeCascade("foo", ["bar", "baz"], null);
	});
	test("invalid merge", () => {
		const invalidMerge = (...values: number[]) => values.join("");
		// @ts-expect-error merge function must accept strings
		createCascade(invalidMerge);
	});
});
