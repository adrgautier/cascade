import { describe, it, vi, expect, Mock } from "vitest";
import { CascadeValue } from "../src/cascadeValue";
import { computeCascadeValue } from "../src/computeCascadeValue";
import { ExtendedArgument } from "../src/types";

describe("computeCascadeValue", () => {
    it("with simple argument", () => {
        // GIVEN
        const className: ExtendedArgument = "input";
        const cascadeValueFromContext = new CascadeValue();
        const addCommonSpy = vi.spyOn(CascadeValue.prototype, 'addCommon');
        const addMatchSpy = vi.spyOn(CascadeValue.prototype, 'addMatch');
        
        // WHEN
        const result = computeCascadeValue(className, cascadeValueFromContext);

        // THEN
        expect(addCommonSpy).toHaveBeenNthCalledWith(1, "input");
        expect(addMatchSpy).not.toHaveBeenCalled();
        expect(result.common).toBe("input");
        expect(result.match).toEqual({});
    });
    it("with complex argument", () => {
        // GIVEN
        const className: ExtendedArgument = ["input", ["focus"], { "disabled": true }, { "error": "alert"}];
        const cascadeValueFromContext = new CascadeValue();
        const addCommonSpy = vi.spyOn(CascadeValue.prototype, 'addCommon');
        const addMatchSpy = vi.spyOn(CascadeValue.prototype, 'addMatch');
        
        // WHEN
        const result = computeCascadeValue(className, cascadeValueFromContext);

        // THEN
        expect(addCommonSpy).toHaveBeenNthCalledWith(1, "input");
        expect(addCommonSpy).toHaveBeenNthCalledWith(2, "focus");
        expect(addCommonSpy).toHaveBeenNthCalledWith(3, "disabled");
        expect(addMatchSpy).toHaveBeenNthCalledWith(1, "alert", "error");
        expect(result.common).toBe("input focus disabled");
        expect(result.match).toEqual({ "error": "alert" });
    });
});