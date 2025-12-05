import { describe, expect, it } from "bun:test";
import { loadInput } from "../../common";
import { Day18Year2015 } from "./day18";

describe("2015 day 18", () => {
    const solution = new Day18Year2015();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", async () => {
        const input = await loadInput(2015, 18, true);
        expect(solution.first(input, { numberOfSteps: 4 })).toEqual(4);
    });

    it("should solve second part", async () => {
        const input = await loadInput(2015, 18, true);
        expect(solution.second(input, { numberOfSteps: 5 })).toEqual(17);
    });
});
