import { describe, expect, it } from "bun:test";
import { loadInput } from "../../common";
import { Day02Year2025 } from "./day02";

describe("2025 day 02", () => {
    const solution = new Day02Year2025();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", async () => {
        const input = await loadInput(2025, 2, true);
        expect(solution.first(input)).toEqual(1227775554);
    });

    it("should solve second part", async () => {
        const input = await loadInput(2025, 2, true);
        expect(solution.second(input)).toEqual(4174379265);
    });
});
