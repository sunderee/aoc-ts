import { expect, test } from "bun:test";
import { uniqueArrays } from "./unique-arrays";

test("uniqueArrays removes duplicates", () => {
    const input = [
        [1, 2],
        [1, 2, 3],
        [1, 2, 3],
        [2, 3],
    ];
    expect(uniqueArrays(input)).toEqual([
        [1, 2],
        [1, 2, 3],
        [2, 3],
    ]);
});

test("preserves order", () => {
    const input = [[3], [1, 2], [1, 2], [3]];
    expect(uniqueArrays(input)).toEqual([[3], [1, 2]]);
});
