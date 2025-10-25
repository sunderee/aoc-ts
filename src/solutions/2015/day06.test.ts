import { describe, expect, it } from "bun:test";
import { Day06Year2015 } from "./day06";

describe("2015 day 06", () => {
    const solution = new Day06Year2015();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", () => {
        expect(solution.first("turn on 0,0 through 999,999")).toEqual(1000000);
        expect(solution.first("toggle 0,0 through 999,0")).toEqual(1000);
        expect(solution.first("turn on 0,0 through 999,999\nturn off 499,499 through 500,500")).toEqual(1000000 - 4);
    });

    it("should solve second part", () => {
        expect(solution.second("turn on 0,0 through 0,0")).toEqual(1);
        expect(solution.second("toggle 0,0 through 999,999")).toEqual(2000000);
        expect(solution.second("turn on 0,0 through 0,0\nturn off 0,0 through 0,0")).toEqual(0);
        expect(solution.second("turn on 0,0 through 0,0\nturn off 0,0 through 0,0\nturn on 0,0 through 0,0")).toEqual(
            1,
        );
        expect(solution.second("turn on 0,0 through 0,0\ntoggle 0,0 through 0,0")).toEqual(3);
    });
});
