import { describe, it, expect } from "vitest";
import { defaultCombineFunction } from "../src/defaultCombineFunction";

describe("defaultCombineFunction", () => {
	it("should join with space", () => {
		expect(defaultCombineFunction("a", "b", "c")).toBe("a b c");
	});
});
