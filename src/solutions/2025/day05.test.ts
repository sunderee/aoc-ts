import { describe, expect, it } from "bun:test";
import { loadInput } from "../../common";
import { Day05Year2025 } from "./day05";

describe("2025 day 05", () => {
    const solution = new Day05Year2025();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", async () => {
        const input = await loadInput(2025, 5, true);
        expect(solution.first(input)).toEqual(3);
    });

    it("should solve second part", async () => {
        const input = await loadInput(2025, 5, true);
        expect(solution.second(input)).toEqual(14);
    });
});
