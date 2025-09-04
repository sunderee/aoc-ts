import type { Pair } from "../data-structures";

export function toPairs<T>(array: Array<T>): Array<Pair<T, T>> {
    if ((array.length & 1) !== 0) {
        throw new Error("Array needs to contain an even number of elements");
    }

    return Array.from({ length: array.length / 2 }, (_, i) => ({
        first: array[i * 2],
        second: array[i * 2 + 1],
    })).filter((item) => item.first !== undefined && item.second !== undefined) as Array<Pair<T, T>>;
}
