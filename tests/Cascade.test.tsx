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
		const cc = createCascade();
		function Input() {
			return <input role="button" className={cc("input")} />;
		}

		// WHEN
		const result = render(<Input />);
	
		// THEN
		expect(result.container.firstChild).toHaveProperty("className", "input");
	});

	test("with post function", () => {
		// GIVEN
		const postFunctionMock = vi.fn(() => "postFunctionResult");
		const cc = createCascade(postFunctionMock);
		function Input() {
			return <input role="button" className={cc("input")} />;
		}

		// WHEN
		const result = render(<Input />);

		// THEN
		expect(postFunctionMock).toHaveBeenCalledWith("input");
		expect(result.container.firstChild).toHaveProperty("className", "postFunctionResult");
	});

	test("with provider", () => {
		// GIVEN
		const cc = createCascade();
		function Input() {
			return <input role="button" className={cc("input")} />;
		}

		// WHEN
		const result = render(<cc.Provider className="password"><Input /></cc.Provider>);

		// THEN
		expect(result.container.firstChild).toHaveProperty("className", "input password");
	});
});
