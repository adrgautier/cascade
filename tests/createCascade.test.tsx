/**
 * This file is not a regular test file.
 * In order for those tests to be validated,
 * the file needs to compile without error.
 */
import React from "react";
import { describe, expect, test, vi } from "vitest";
import { createCascade } from "../src";

import { render } from "@testing-library/react";

describe("createCascade", () => {
	test("no provider (unique element)", () => {
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

	test("with in function (unique element)", () => {
		// GIVEN
		const inFunctionMock = vi.fn((a: string) => "inFunctionResult");
		const [useCascade] = createCascade({ in: inFunctionMock });
		function Input() {
			return <input role="button" className={useCascade("input")} />;
		}

		// WHEN
		const result = render(<Input />);

		// THEN
		expect(inFunctionMock).toHaveBeenCalledWith("input");
		expect(result.container.firstChild).toHaveProperty(
			"className",
			"inFunctionResult",
		);
	});

	test("with out function (unique element)", () => {
		// GIVEN
		const outFunctionMock = vi.fn(() => "outFunctionResult");
		const [useCascade, CascadeProvider] = createCascade({
			out: outFunctionMock,
		});
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
		expect(outFunctionMock).toHaveBeenCalledWith("input password");
		expect(result.container.firstChild).toHaveProperty(
			"className",
			"outFunctionResult",
		);
	});

	test("with in & out function (unique element)", () => {
		// GIVEN
		const inFunctionMock = vi.fn((a: string) => "inFunctionResult");
		const outFunctionMock = vi.fn(() => "outFunctionResult");
		const [useCascade, CascadeProvider] = createCascade({
			in: inFunctionMock,
			out: outFunctionMock,
		});
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
		expect(inFunctionMock).toHaveBeenCalledWith("input");
		expect(outFunctionMock).toHaveBeenCalledWith("inFunctionResult password");
		expect(result.container.firstChild).toHaveProperty(
			"className",
			"outFunctionResult",
		);
	});

	test("with two providers (unique element)", () => {
		// GIVEN
		const [useCascade, CascadeProvider] = createCascade();
		function Input() {
			return <input role="button" className={useCascade("input")} />;
		}

		// WHEN
		const result = render(
			<CascadeProvider className="form">
				<CascadeProvider className="password">
					<Input />
				</CascadeProvider>
			</CascadeProvider>,
		);

		// THEN
		expect(result.container.firstChild).toHaveProperty(
			"className",
			"input form password",
		);
	});

	test("no provider (multiple element)", () => {
		// GIVEN
		const [useCascade] = createCascade("button");
		function Input() {
			return <input role="button" className={useCascade.button("input")} />;
		}

		// WHEN
		const result = render(<Input />);

		// THEN
		expect(result.container.firstChild).toHaveProperty("className", "input");
	});

	test("with out function (multiple element)", () => {
		// GIVEN
		const outFunctionMock = vi.fn(() => "outFunctionResult");
		const [useCascade] = createCascade({ out: outFunctionMock }, "button");
		function Input() {
			return <input role="button" className={useCascade.button("input")} />;
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

	test("with provider (multiple element)", () => {
		// GIVEN
		const [useCascade, CascadeProvider] = createCascade("button");
		function Input() {
			return <input role="button" className={useCascade.button("input")} />;
		}

		// WHEN
		const result = render(
			<CascadeProvider.button className="password">
				<Input />
			</CascadeProvider.button>,
		);

		// THEN
		expect(result.container.firstChild).toHaveProperty(
			"className",
			"input password",
		);
	});
});
