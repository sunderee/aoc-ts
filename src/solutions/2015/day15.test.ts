import { describe, expect, it } from "bun:test";
import { loadInput } from "../../common";
import { Day15Year2015 } from "./day15";

describe("2015 day 15", () => {
    const solution = new Day15Year2015();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", async () => {
        const input = await loadInput(2015, 15, true);
        expect(solution.first(input)).toEqual(62842880);
    });

    it("should solve second part", async () => {
        const input = await loadInput(2015, 15, true);
        expect(solution.second(input)).toEqual(57600000);
    });
});
