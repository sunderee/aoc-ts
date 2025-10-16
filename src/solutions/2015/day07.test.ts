import { describe, expect, it } from "bun:test";
import { Day07Year2015 } from "./day07";

describe("2015 day 07", () => {
    const solution = new Day07Year2015();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", () => {
        expect(solution.first("")).toEqual(-1);
    });

    it("should solve second part", () => {
        expect(solution.second("")).toEqual(-1);
    });
});
