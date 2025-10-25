import type { Solution } from "../../common";

export class Day05Year2015 implements Solution {
    first(input: string): number {
        return input
            .split("\n")
            .map(
                (item) =>
                    /[aeiou].*[aeiou].*[aeiou]/.test(item) && /(.)\1/.test(item) && /^(?!.*(ab|cd|pq|xy))/.test(item),
            )
            .filter((item) => item).length;
    }

    second(input: string): number {
        return input
            .split("\n")
            .map((item) => /(..).*\1/.test(item) && /(.).\1/.test(item))
            .filter((item) => item).length;
    }
}
