import { describe, expect, it } from "bun:test";
import { loadInput } from "../../common";
import { Day06Year2025 } from "./day06";

describe("2025 day 06", () => {
    const solution = new Day06Year2025();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", async () => {
        const input = await loadInput(2025, 6, true);
        expect(solution.first(input)).toEqual(4277556);
    });

    it("should solve second part", async () => {
        const input = await loadInput(2025, 6, true);
        expect(solution.second(input)).toEqual(3263827);
    });
});
