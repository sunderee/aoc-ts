import { describe, expect, it } from "bun:test";
import { Day05Year2015 } from "./day05";

describe("YYYY day 01", () => {
  const solution = new Day05Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", () => {
    expect(solution.first("ugknbfddgicrmopn")).toEqual(1);
    expect(solution.first("aaa")).toEqual(1);
    expect(solution.first("jchzalrnumimnmhp")).toEqual(0);
    expect(solution.first("haegwjzuvuyypxyu")).toEqual(0);
    expect(solution.first("dvszwmarrgswjxmb")).toEqual(0);
  });

  it("should solve second part", () => {
    expect(solution.second("qjhvhtzxzqqjkmpb")).toEqual(1);
    expect(solution.second("xxyxx")).toEqual(1);
    expect(solution.second("uurcxstgmygtbstg")).toEqual(0);
    expect(solution.second("ieodomkazucvgmuy")).toEqual(0);
  });
});
