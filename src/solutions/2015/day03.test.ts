import { describe, expect, it } from "bun:test";
import { Day03Year2015 } from "./day03";

describe("2015 day 03", () => {
  const solution = new Day03Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", () => {
    expect(solution.first(">")).toEqual(2);
    expect(solution.first("^>v<")).toEqual(4);
    expect(solution.first("^v^v^v^v^v")).toEqual(2);
  });

  it("should solve second part", () => {
    expect(solution.second("^v")).toEqual(3);
    expect(solution.second("^>v<")).toEqual(3);
    expect(solution.second("^v^v^v^v^v")).toEqual(11);
  });
});
