// permutations.test.ts
import { describe, expect, test } from "bun:test";
import { permutations } from "./permutations";

describe("permutations", () => {
    test("returns empty array for empty input", () => {
        expect(permutations([])).toEqual([[]]);
    });

    test("returns single element array for single element input", () => {
        expect(permutations([1])).toEqual([[1]]);
        expect(permutations(["a"])).toEqual([["a"]]);
    });

    test("generates all permutations for two numbers", () => {
        const result = permutations([1, 2]);
        expect(result).toHaveLength(2);
        expect(result).toContainEqual([1, 2]);
        expect(result).toContainEqual([2, 1]);
    });

    test("generates all permutations for two strings", () => {
        const result = permutations(["a", "b"]);
        expect(result).toHaveLength(2);
        expect(result).toContainEqual(["a", "b"]);
        expect(result).toContainEqual(["b", "a"]);
    });

    test("generates all permutations for three numbers", () => {
        const result = permutations([1, 2, 3]);
        expect(result).toHaveLength(6); // 3! = 6

        const expected: Array<Array<1 | 2 | 3>> = [
            [1, 2, 3],
            [1, 3, 2],
            [2, 1, 3],
            [2, 3, 1],
            [3, 1, 2],
            [3, 2, 1],
        ];

        expected.forEach((perm) => {
            expect(result).toContainEqual(perm);
        });
    });

    test("generates all permutations for three strings", () => {
        const result = permutations(["x", "y", "z"]);
        expect(result).toHaveLength(6);
        expect(result).toContainEqual(["x", "y", "z"]);
        expect(result).toContainEqual(["z", "y", "x"]);
    });

    test("handles duplicate numbers", () => {
        const result = permutations([1, 1, 2]);
        expect(result).toHaveLength(6); // Still generates all permutations including duplicates
    });

    test("generates correct number of permutations for 4 elements", () => {
        const result = permutations([1, 2, 3, 4]);
        expect(result).toHaveLength(24); // 4! = 24
    });

    test("maintains type safety with mixed but valid types", () => {
        // This should work fine with numbers
        const nums = permutations([1, 2, 3]);
        expect(nums[0]?.[0]).toBeNumber();

        // This should work fine with strings
        const strs = permutations(["a", "b", "c"]);
        expect(strs[0]?.[0]).toBeString();
    });
});
