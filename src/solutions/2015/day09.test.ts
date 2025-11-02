import { describe, expect, it } from "bun:test";
import { loadInput } from "../../common";
import { Day09Year2015 } from "./day09";

describe("2015 day 09", () => {
    const solution = new Day09Year2015();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", async () => {
        const testInput = await loadInput(2015, 9, true);
        expect(solution.first(testInput)).toEqual(605);
    });

    it("should solve second part", async () => {
        const testInput = await loadInput(2015, 9, true);
        expect(solution.second(testInput)).toEqual(982);
    });
});
