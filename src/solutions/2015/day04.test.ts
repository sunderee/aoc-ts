import { describe, expect, it } from "bun:test";
import { Day04Year2015 } from "./day04";

describe("2015 day 04", () => {
    const solution = new Day04Year2015();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", () => {
        expect(solution.first("abcdef")).toEqual(609043);
        expect(solution.first("pqrstuv")).toEqual(1048970);
    });
});
