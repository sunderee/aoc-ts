import { describe, expect, it } from "bun:test";
import { loadInput } from "../../common";
import { Day07Year2015 } from "./day07";

describe("2015 day 07", () => {
    const solution = new Day07Year2015();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", async () => {
        const testInput = await loadInput(2015, 7, true);

        expect(solution.first(testInput, { targetWire: 'd' })).toEqual(72);
        expect(solution.first(testInput, { targetWire: 'e' })).toEqual(507);
        expect(solution.first(testInput, { targetWire: 'f' })).toEqual(492);
        expect(solution.first(testInput, { targetWire: 'g' })).toEqual(114);
        expect(solution.first(testInput, { targetWire: 'h' })).toEqual(65412);
        expect(solution.first(testInput, { targetWire: 'i' })).toEqual(65079);
        expect(solution.first(testInput, { targetWire: 'x' })).toEqual(123);
        expect(solution.first(testInput, { targetWire: 'y' })).toEqual(456);
    });

    it("should solve second part", () => {
        expect(solution.second("")).toEqual(-1);
    });
});
