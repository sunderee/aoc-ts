import { describe, expect, it } from "bun:test";
import { loadInput } from "../../common";
import { Day03Year2025 } from "./day03";

describe("2025 day 03", () => {
    const solution = new Day03Year2025();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", async () => {
        expect(solution.first("987654321111111")).toEqual(98);
        expect(solution.first("811111111111119")).toEqual(89);
        expect(solution.first("234234234234278")).toEqual(78);
        expect(solution.first("818181911112111")).toEqual(92);

        const input = await loadInput(2025, 3, true);
        expect(solution.first(input)).toEqual(357);
    });

    it("should solve second part", async () => {
        expect(solution.second("987654321111111")).toEqual(987654321111);
        expect(solution.second("811111111111119")).toEqual(811111111119);
        expect(solution.second("234234234234278")).toEqual(434234234278);
        expect(solution.second("818181911112111")).toEqual(888911112111);

        const input = await loadInput(2025, 3, true);
        expect(solution.second(input)).toEqual(3121910778619);
    });
});
