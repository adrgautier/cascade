import { describe, it, expect } from "vitest";
import { CascadeValue } from "../src/cascadeValue";

describe("CascadeValue", () => {
	it("new empty", () => {
		const cascadeValue = new CascadeValue();
		expect(cascadeValue.common).toBe("");
		expect(cascadeValue.match).toEqual({});
	});
	it("add class names and clone", () => {
		const cascade = new CascadeValue();
		cascade.addCommon("foo");
		cascade.addCommon("bar");
		cascade.addMatch("buz", "baz");
		cascade.addMatch("boz", "baz");

		expect(cascade.common).toBe("foo bar");
		expect(cascade.match).toEqual({baz: "buz boz"});

		const cloneCascade = new CascadeValue(cascade);
		expect(cloneCascade.common).toBe("foo bar");
		expect(cloneCascade.match).toEqual({baz: "buz boz"});
	});
});
