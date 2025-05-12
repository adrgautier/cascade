/**
 * This file is not a regular test file.
 * In order for those tests to be validated,
 * the file needs to compile without error.
 */
import React from "react";
import { describe, expect, test, vi } from "vitest";
import { createCascade } from "../src";

import { render } from "@testing-library/react";

describe("Cascade", () => {
	test("no provider", () => {
		// GIVEN
		const [useCascade] = createCascade();
		function Input() {
			return <input role="button" className={useCascade("input")} />;
		}

		// WHEN
		const result = render(<Input />);

		// THEN
		expect(result.container.firstChild).toHaveProperty("className", "input");
	});

	test("with out function", () => {
		// GIVEN
		const outFunctionMock = vi.fn(() => "outFunctionResult");
		const [useCascade] = createCascade({ out: outFunctionMock });
		function Input() {
			return <input role="button" className={useCascade("input")} />;
		}

		// WHEN
		const result = render(<Input />);

		// THEN
		expect(outFunctionMock).toHaveBeenCalledWith("input");
		expect(result.container.firstChild).toHaveProperty(
			"className",
			"outFunctionResult",
		);
	});

	test("with provider", () => {
		// GIVEN
		const [useCascade, CascadeProvider] = createCascade();
		function Input() {
			return <input role="button" className={useCascade("input")} />;
		}

		// WHEN
		const result = render(
			<CascadeProvider className="password">
				<Input />
			</CascadeProvider>,
		);

		// THEN
		expect(result.container.firstChild).toHaveProperty(
			"className",
			"input password",
		);
	});
});
