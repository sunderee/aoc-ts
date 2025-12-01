import { describe, expect, it } from "bun:test";
import { loadInput } from "../../common";
import { Day01Year2025 } from "./day01";

describe("2025 day 01", () => {
    const solution = new Day01Year2025();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", async () => {
        const input = await loadInput(2025, 1, true);
        expect(solution.first(input)).toEqual(3);
    });

    it("should solve second part", async () => {
        const input = await loadInput(2025, 1, true);
        expect(solution.second(input)).toEqual(6);
    });
});
