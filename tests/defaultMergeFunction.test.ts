import { describe, it, expect } from "vitest";
import { defaultMergeFunction } from "../src/defaultMergeFunction";

describe("defaultMergeFunction", () => {
	it("should join with space", () => {
		expect(defaultMergeFunction("a", "b", "c")).toBe("a b c");
	});
});
