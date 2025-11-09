import { describe, expect, it } from "bun:test";
import { Day11Year2015 } from "./day11";

describe("2015 day 11", () => {
    const solution = new Day11Year2015();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", () => {
        expect(solution.first("abcdefgh")).toEqual("abcdffaa");
        expect(solution.first("ghijklmn")).toEqual("ghjaabcc");
    });
});
