import { describe, expect, it } from "bun:test";
import type { Pair } from "../data-structures";
import { toPairs } from "./to-pairs";

describe("toPairs", () => {
  it("should convert array to pairs of strings", () => {
    const input = ["X", "Y", "X", "Z", "Y", "Z"];
    const expected: Pair<string, string>[] = [
      { first: "X", second: "Y" },
      { first: "X", second: "Z" },
      { first: "Y", second: "Z" },
    ];
    expect(toPairs(input)).toEqual(expected);
  });

  it("should convert array to pairs of numbers", () => {
    const input = [1, 2, 3, 4];
    const expected: Pair<number, number>[] = [
      { first: 1, second: 2 },
      { first: 3, second: 4 },
    ];
    expect(toPairs(input)).toEqual(expected);
  });

  it("should handle empty array", () => {
    expect(toPairs([])).toEqual([]);
  });

  it("should throw for odd-length array", () => {
    expect(() => toPairs(["X", "Y", "Z"])).toThrow(
      "Array needs to contain an even number of elements",
    );
  });

  it("should handle mixed types if compatible", () => {
    const input = [1, "two", 3, "four"];
    const expected: Pair<number | string, number | string>[] = [
      { first: 1, second: "two" },
      { first: 3, second: "four" },
    ];
    expect(toPairs(input)).toEqual(expected);
  });

  it("should maintain pair order", () => {
    const input = [0, 1, 2, 3, 4, 5];
    const result = toPairs(input);
    expect(result[0]).toEqual({ first: 0, second: 1 });
    expect(result[1]).toEqual({ first: 2, second: 3 });
    expect(result[2]).toEqual({ first: 4, second: 5 });
  });
});
