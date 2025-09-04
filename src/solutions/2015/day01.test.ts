import { describe, expect, it } from "bun:test";
import { Day01Year2015 } from "./day01";

describe("2015 day 01", () => {
  const solution = new Day01Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", () => {
    expect(solution.first("(())")).toEqual(0);
    expect(solution.first("()()")).toEqual(0);
    expect(solution.first("(((")).toEqual(3);
    expect(solution.first("(()(()(")).toEqual(3);
    expect(solution.first("))(((((")).toEqual(3);
    expect(solution.first("())")).toEqual(-1);
    expect(solution.first("))(")).toEqual(-1);
    expect(solution.first(")))")).toEqual(-3);
    expect(solution.first(")())())")).toEqual(-3);
  });

  it("should solve second part", () => {
    expect(solution.second(")")).toEqual(1);
    expect(solution.second("()())")).toEqual(5);
  });
});
