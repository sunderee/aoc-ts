import { describe, expect, it } from "bun:test";
import { Day10Year2015 } from "./day10";

describe("2015 day 10", () => {
    const solution = new Day10Year2015();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", () => {
        expect(solution.first("1")).toEqual(82350);
    });

    it("should solve second part", () => {
        expect(solution.second("1")).toEqual(1166642);
    });
});
