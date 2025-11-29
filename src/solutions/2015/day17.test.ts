import { describe, expect, it } from "bun:test";
import { Day17Year2015 } from "./day17";

describe("2015 day 17", () => {
    const solution = new Day17Year2015();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", () => {
        const input = [20, 15, 10, 5, 5].join("\n");
        expect(solution.first(input, { maxContainerSize: 25 })).toEqual(4);
    });

    it("should solve second part", () => {
        const input = [20, 15, 10, 5, 5].join("\n");
        expect(solution.second(input, { maxContainerSize: 25 })).toEqual(3);
    });
});
