import { describe, expect, it } from "bun:test";
import { Day14Year2015 } from "./day14";

describe("2015 day 14", () => {
    const solution = new Day14Year2015();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", () => {
        expect(
            solution.first("Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.", {
                flyDuration: 1,
            }),
        ).toEqual(14);
        expect(
            solution.first("Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.", {
                flyDuration: 10,
            }),
        ).toEqual(140);
        expect(
            solution.first("Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.", {
                flyDuration: 1000,
            }),
        ).toEqual(1120);
        expect(
            solution.first("Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.", {
                flyDuration: 1,
            }),
        ).toEqual(16);
        expect(
            solution.first("Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.", {
                flyDuration: 10,
            }),
        ).toEqual(160);
        expect(
            solution.first("Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.", {
                flyDuration: 1000,
            }),
        ).toEqual(1056);
    });

    it("should solve second part", () => {
        const input = [
            "Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.",
            "Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.",
        ].join("\n");
        expect(solution.second(input, { flyDuration: 1000 })).toEqual(689);
    });
});
