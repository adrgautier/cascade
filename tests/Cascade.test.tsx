/**
 * This file is not a regular test file.
 * In order for those tests to be validated,
 * the file needs to compile without error.
 */
import React from "react";
import { createCascade } from "../src";
import { defaultMergeFunction } from "../src/defaultMergeFunction";
import { describe, expect, test, vitest } from "vitest";

import { render } from "@testing-library/react";

describe("Cascade", () => {
	test("no provider", () => {
		const mergeFunction = vitest.fn(defaultMergeFunction);
		const cs = createCascade(mergeFunction);
		function Input(){ return <input role="button" className={cs("input")} />};

		Input.Cascade = cs.Provider;
		render(<Input />);

		expect(mergeFunction).toHaveBeenCalledWith("input");
	});
	test("1 provider (string)", () => {
		const mergeFunction = vitest.fn(defaultMergeFunction);
		const cs = createCascade(mergeFunction);
		const InputCascade = cs.Provider;

		function Input(){ return <input role="button" className={cs("input")} />};

		Input.Cascade = cs.Provider;
		render(
			<Input.Cascade className={"extra"}>
				<Input />
			</Input.Cascade>,
		);

		expect(mergeFunction).toHaveBeenCalledWith("input", "extra");
	});
	test("1 provider (string array)", () => {
		const mergeFunction = vitest.fn(defaultMergeFunction);
		const cs = createCascade(mergeFunction);
		const InputCascade = cs.Provider;

		const Input = () => <input role="button" className={cs("input")} />;

		render(
			<InputCascade className={["extra", "plus"]}>
				<Input />
			</InputCascade>,
		);

		expect(mergeFunction).toHaveBeenCalledWith("input", "extra", "plus");
	});
	test("1 provider (string record)", () => {
		const mergeFunction = vitest.fn(defaultMergeFunction);
		const cs = createCascade(mergeFunction);
		const InputCascade = cs.Provider;

		const Input = () => <input role="button" className={cs("input")} />;
		const Submit = () => <input role="button" className={cs("submit")} />;

		render(
			<InputCascade className={{ "input": "extra plus", "submit": "bonus" }}>
				<Input />
				<Submit />
			</InputCascade>,
		);

		expect(mergeFunction).toHaveBeenNthCalledWith(1, "input", "extra plus");
		expect(mergeFunction).toHaveBeenNthCalledWith(2, "submit", "bonus");
	});
	test("1 provider (array record)", () => {
		const mergeFunction = vitest.fn(defaultMergeFunction);
		const cs = createCascade(mergeFunction);
		const InputCascade = cs.Provider;

		const Input = () => <input role="button" className={cs("input")} />;
		const Submit = () => <input role="button" className={cs("submit")} />;

		render(
			<InputCascade className={{ "input": ["extra", "plus"], "submit": "bonus" }}>
				<Input />
				<Submit />
			</InputCascade>,
		);

		expect(mergeFunction).toHaveBeenNthCalledWith(1, "input", "extra", "plus");
		expect(mergeFunction).toHaveBeenNthCalledWith(2, "submit", "bonus");
	});
	test("1 provider (function)", () => {
		const mergeFunction = vitest.fn(defaultMergeFunction);
		const cs = createCascade(mergeFunction);
		const InputCascade = cs.Provider;

		const Input = () => <input role="button" className={cs("input")} />;

		render(
			<InputCascade className={(value) => (['extra', ...value])}>
				<Input />
			</InputCascade>,
		);

		expect(mergeFunction).toHaveBeenCalledWith("extra", "input");
	});
	test("2 provider (string)", () => {
		const mergeFunction = vitest.fn(defaultMergeFunction);
		const cs = createCascade(mergeFunction);
		const InputCascade = cs.Provider;

		const Input = () => <input role="button" className={cs("input")} />;

		render(
			<InputCascade className={"plus"}>
				<InputCascade className={"extra"}>
					<Input />
				</InputCascade>
			</InputCascade>,
		);

		expect(mergeFunction).toHaveBeenCalledWith("input", "extra", "plus");
	});
	test("2 provider (function)", () => {
		const mergeFunction = vitest.fn(defaultMergeFunction);
		const cs = createCascade(mergeFunction);
		const InputCascade = cs.Provider;

		const Input = () => <input role="button" className={cs("input")} />;

		render(<InputCascade className={(value) => ([...value, 'plus'])}>
						<InputCascade className={(value) => (['extra', ...value])}>
				<Input />
			</InputCascade>,
		</InputCascade>);

		expect(mergeFunction).toHaveBeenCalledWith("extra", "input", "plus");
	});
});
