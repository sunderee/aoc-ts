import { describe, expect, it } from "bun:test";
import { Day01Year2025 } from "./day01";

describe("2025 day 01", () => {
    const solution = new Day01Year2025();

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
