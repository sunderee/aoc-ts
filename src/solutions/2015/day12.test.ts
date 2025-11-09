import { describe, expect, it } from "bun:test";
import { Day12Year2015 } from "./day12";

describe("2015 day 12", () => {
    const solution = new Day12Year2015();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", () => {
        expect(solution.first(`[1,2,3]`)).toEqual(6);
        expect(solution.first(`{"a":2,"b":4}`)).toEqual(6);
        expect(solution.first(`[[[3]]]`)).toEqual(3);
        expect(solution.first(`{"a":{"b":4},"c":-1}`)).toEqual(3);
        expect(solution.first(`{"a":[-1,1]}`)).toEqual(0);
        expect(solution.first(`[-1,{"a":1}]`)).toEqual(0);
        expect(solution.first(`[]`)).toEqual(0);
        expect(solution.first(`{}`)).toEqual(0);
    });

    it("should solve second part", () => {
        expect(solution.second(`[1,2,3]`)).toEqual(6);
        expect(solution.second(`[1,{"c":"red","b":2},3]`)).toEqual(4);
        expect(solution.second(`{"d":"red","e":[1,2,3,4],"f":5}`)).toEqual(0);
        expect(solution.second(`[1,"red",5]`)).toEqual(6);
    });
});
