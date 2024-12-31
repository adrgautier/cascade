import { describe, it, expect } from "vitest";
import { CascadeValue } from "../src/cascadeValue";
import { computeClassName } from "../src/computeClassName";
import { Argument } from "../src/types";

describe("computeClassName", () => {
    it("with simple arguments (empty context)", () => {
        // GIVEN
        const args: Argument[] = ["input"];
        const cascadeValueFromContext = new CascadeValue();
        
        // WHEN
        const result = computeClassName(args, cascadeValueFromContext);

        // THEN
        expect(result).toBe("input");
    });
    it("with complex arguments (empty context)", () => {
        // GIVEN
        const args: Argument[] = ["input", ["focus"], { "disabled": true }];
        const cascadeValueFromContext = new CascadeValue();
        
        // WHEN
        const result = computeClassName(args, cascadeValueFromContext);

        // THEN
        expect(result).toBe("input focus disabled");
    });
    it("with complex arguments (with context)", () => {
        // GIVEN
        const args: Argument[] = ["input", ["focus"], { "disabled": true }];
        const cascadeValueFromContext = new CascadeValue();
        cascadeValueFromContext.addCommon("password");
        cascadeValueFromContext.addMatch("alert", "error");
        cascadeValueFromContext.addMatch("hidden", "disabled");
        cascadeValueFromContext.addMatch("highlight", "focus");

        
        // WHEN
        const result = computeClassName(args, cascadeValueFromContext);

        // THEN
        expect(result).toBe("input focus disabled password highlight hidden");
    });
});