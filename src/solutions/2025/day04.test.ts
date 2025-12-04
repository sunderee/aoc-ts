import { describe, expect, it } from "bun:test";
import { loadInput } from "../../common";
import { Day04Year2025 } from "./day04";

describe("2025 day 04", () => {
    const solution = new Day04Year2025();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", async () => {
        const input = await loadInput(2025, 4, true);
        expect(solution.first(input)).toEqual(13);
    });

    it("should solve second part", async () => {
        const input = await loadInput(2025, 4, true);
        expect(solution.second(input)).toEqual(43);
    });
});
