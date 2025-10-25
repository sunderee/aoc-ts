import { describe, expect, it } from "bun:test";
import { loadInput } from "../../common";
import { Day08Year2015 } from "./day08";

describe("2015 day 08", () => {
    const solution = new Day08Year2015();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", async () => {
        const testInput = await loadInput(2015, 8, true);
        expect(solution.first(testInput)).toEqual(12);
    });

    it("should solve second part", async () => {
        const testInput = await loadInput(2015, 8, true);
        expect(solution.second(testInput)).toEqual(19);
    });
});
