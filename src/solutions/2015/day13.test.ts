import { describe, expect, it } from "bun:test";
import { loadInput } from "../../common";
import { Day13Year2015 } from "./day13";

describe("2015 day 13", () => {
    const solution = new Day13Year2015();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", async () => {
        const testInput = await loadInput(2015, 13, true);
        expect(solution.first(testInput)).toEqual(330);
    });
});
