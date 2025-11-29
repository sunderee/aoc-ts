import { expect, test } from "bun:test";

function* distribute(n: number, total: number): Generator<number[]> {
    if (n < 1) return;
    if (n === 1) {
        yield [total];
        return;
    }
    for (let i = 0; i <= total; i++) {
        for (const rest of distribute(n - 1, total - i)) {
            yield [i, ...rest];
        }
    }
}

function collect(gen: Generator<number[]>): number[][] {
    return Array.from(gen).sort(); // sorts for stable comparison
}

test("distribute(1, 5)", () => {
    expect(collect(distribute(1, 5))).toEqual([[5]]);
});

test("distribute(2, 3)", () => {
    expect(collect(distribute(2, 3))).toEqual([
        [0, 3],
        [1, 2],
        [2, 1],
        [3, 0],
    ]);
});

test("distribute(3, 2)", () => {
    expect(collect(distribute(3, 2))).toEqual([
        [0, 0, 2],
        [0, 1, 1],
        [0, 2, 0],
        [1, 0, 1],
        [1, 1, 0],
        [2, 0, 0],
    ]);
});

test("distribute(3, 0)", () => {
    expect(collect(distribute(3, 0))).toEqual([[0, 0, 0]]);
});

test("distribute(4, 1)", () => {
    const result = collect(distribute(4, 1));
    expect(result.length).toBe(4);
    expect(result).toContainEqual([1, 0, 0, 0]);
    expect(result).toContainEqual([0, 1, 0, 0]);
    expect(result).toContainEqual([0, 0, 1, 0]);
    expect(result).toContainEqual([0, 0, 0, 1]);
});

test("n < 1 returns empty", () => {
    expect(collect(distribute(0, 10))).toEqual([]);
    expect(collect(distribute(-5, 10))).toEqual([]);
});
