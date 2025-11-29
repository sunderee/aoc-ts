import { expect, test } from "bun:test";
import { combinations } from "./combinations";

test("empty array", () => {
    expect(Array.from(combinations([]))).toEqual([[]]);
});

test("single element", () => {
    expect(Array.from(combinations([1]))).toEqual([[], [1]]);
});

test("duplicates [1,2,2,3]", () => {
    const result = Array.from(combinations([1, 2, 2, 3]));
    expect(result).toEqual([
        [],
        [1],
        [2],
        [1, 2],
        [2],
        [1, 2],
        [2, 2],
        [1, 2, 2],
        [3],
        [1, 3],
        [2, 3],
        [1, 2, 3],
        [2, 3],
        [1, 2, 3],
        [2, 2, 3],
        [1, 2, 2, 3],
    ]);
    expect(result.length).toBe(16);
});
