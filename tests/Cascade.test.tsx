/**
 * This file is not a regular test file.
 * In order for those tests to be validated,
 * the file needs to compile without error.
 */
import React from "react";
import { describe, expect, test, vitest } from "vitest";
import { createCascade } from "../src";
import { defaultCombineFunction } from "../src/defaultCombineFunction";

import { render } from "@testing-library/react";

describe("Cascade", () => {
	test("no provider", () => {
		const combineFunction = vitest.fn(defaultCombineFunction);
		const cc = createCascade(combineFunction);
		function Input() {
			return <input role="button" className={cc("input")} />;
		}

		Input.Cascade = cc.Provider;
		render(<Input />);

		expect(combineFunction).toHaveBeenCalledWith("input");
	});
	test("1 provider (className)", () => {
		const combineFunction = vitest.fn(defaultCombineFunction);
		const cc = createCascade(combineFunction);

		function Input() {
			return <input role="button" className={cc("input")} />;
		}

		Input.Cascade = cc.Provider;
		render(
			<Input.Cascade className="extra">
				<Input />
			</Input.Cascade>,
		);

		expect(combineFunction).toHaveBeenCalledWith("input", "extra");
	});
	test("1 provider (args array)", () => {
		const combineFunction = vitest.fn(defaultCombineFunction);
		const cc = createCascade(combineFunction);
		const InputCascade = cc.Provider;

		const Input = () => <input role="button" className={cc("input")} />;

		render(
			<InputCascade args={["extra", "plus"]}>
				<Input />
			</InputCascade>,
		);

		expect(combineFunction).toHaveBeenCalledWith("input", "extra", "plus");
	});
	test("1 provider (args record)", () => {
		const combineFunction = vitest.fn(defaultCombineFunction);
		const cc = createCascade(combineFunction);
		const InputCascade = cc.Provider;

		const Input = () => <input role="button" className={cc("input")} />;
		const Submit = () => <input role="button" className={cc("submit")} />;

		render(
			<InputCascade args={{ input: ["extra", "plus"], submit: ["bonus"] }}>
				<Input />
				<Submit />
			</InputCascade>,
		);

		expect(combineFunction).toHaveBeenNthCalledWith(
			1,
			"input",
			"extra",
			"plus",
		);
		expect(combineFunction).toHaveBeenNthCalledWith(2, "submit", "bonus");
	});
	test("1 provider (args function)", () => {
		const combineFunction = vitest.fn(defaultCombineFunction);
		const cc = createCascade(combineFunction);
		const InputCascade = cc.Provider;

		const Input = () => <input role="button" className={cc("input")} />;

		render(
			<InputCascade args={(args) => ["extra", ...args]}>
				<Input />
			</InputCascade>,
		);

		expect(combineFunction).toHaveBeenCalledWith("extra", "input");
	});
	test("2 provider (className)", () => {
		const combineFunction = vitest.fn(defaultCombineFunction);
		const cc = createCascade(combineFunction);
		const InputCascade = cc.Provider;

		const Input = () => <input role="button" className={cc("input")} />;

		render(
			<InputCascade className="plus">
				<InputCascade className="extra">
					<Input />
				</InputCascade>
			</InputCascade>,
		);

		expect(combineFunction).toHaveBeenCalledWith("input", "extra", "plus");
	});
	test("2 provider (args function)", () => {
		const combineFunction = vitest.fn(defaultCombineFunction);
		const cc = createCascade(combineFunction);
		const InputCascade = cc.Provider;

		const Input = () => <input role="button" className={cc("input")} />;

		render(
			<InputCascade args={(args) => [...args, "plus"]}>
				<InputCascade args={(args) => ["extra", ...args]}>
					<Input />
				</InputCascade>
				,
			</InputCascade>,
		);

		expect(combineFunction).toHaveBeenCalledWith("extra", "input", "plus");
	});
});
