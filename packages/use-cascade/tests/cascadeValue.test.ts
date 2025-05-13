import { describe, it, expect } from "vitest";
import { CascadeValue } from "../src/cascadeValue";
import { UniqueElement } from "../src/constants";

describe("CascadeValue", () => {
	it("should extend cascade multiple time", () => {
		const cascadeValue = new CascadeValue();

		const extendedCascadeValue = cascadeValue.extend("element", "class1");

		expect(cascadeValue.get("element")).toBe("");
		expect(extendedCascadeValue.get("element")).toBe("class1");

		const extendedCascadeValue2 = extendedCascadeValue.extend(
			"element",
			"class2",
		);

		expect(cascadeValue.get("element")).toBe("");
		expect(extendedCascadeValue.get("element")).toBe("class1");
		expect(extendedCascadeValue2.get("element")).toBe("class1 class2");
	});
	it("should extend cascade with different elements", () => {
		const cascadeValue = new CascadeValue();

		const extendedCascadeValue = cascadeValue.extend("element1", "class1");
		const extendedCascadeValue2 = extendedCascadeValue.extend(
			"element2",
			"class2",
		);

		expect(cascadeValue.get("element1")).toBe("");
		expect(cascadeValue.get("element2")).toBe("");
		expect(extendedCascadeValue.get("element1")).toBe("class1");
		expect(extendedCascadeValue.get("element2")).toBe("");
		expect(extendedCascadeValue2.get("element1")).toBe("class1");
		expect(extendedCascadeValue2.get("element2")).toBe("class2");
	});
	it("should extend cascade using UniqueElement", () => {
		const cascadeValue = new CascadeValue();

		const extendedCascadeValue = cascadeValue.extend(UniqueElement, "class1");
		const extendedCascadeValue2 = extendedCascadeValue.extend(
			UniqueElement,
			"class2",
		);

		expect(cascadeValue.get(UniqueElement)).toBe("");
		expect(extendedCascadeValue.get(UniqueElement)).toBe("class1");
		expect(extendedCascadeValue2.get(UniqueElement)).toBe("class1 class2");
	});
});
