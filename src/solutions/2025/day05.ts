import type { Solution } from "../../common";

type IngredientsDatabase = {
    ranges: { start: bigint; end: bigint }[];
    ids: number[];
};

export class Day05Year2025 implements Solution {
    first(input: string): number {
        const ingredientsDatabase = this.parseIngredientsDatabase(input);
        return ingredientsDatabase.ids.filter((id) => this.isInRange(id, ingredientsDatabase.ranges)).length;
    }

    second(input: string): number {
        const ingredientsDatabase = this.parseIngredientsDatabase(input);

        const sortedRanges = [...ingredientsDatabase.ranges].sort((first, second) =>
            first.start < second.start ? -1 : first.start > second.start ? 1 : 0,
        );
        const mergedRanges: { start: bigint; end: bigint }[] = [];
        for (const range of sortedRanges) {
            if (mergedRanges.length === 0) {
                mergedRanges.push({ ...range });
            } else {
                const lastMerged = mergedRanges[mergedRanges.length - 1];
                if (lastMerged === undefined) {
                    throw new Error("Last merged is undefined");
                }

                if (range.start <= lastMerged.end + 1n) {
                    if (range.end > lastMerged.end) {
                        lastMerged.end = range.end;
                    }
                } else {
                    mergedRanges.push({ ...range });
                }
            }
        }

        let totalRangeSize = 0n;
        for (const range of mergedRanges) {
            totalRangeSize += range.end - range.start + 1n;
        }

        return Number(totalRangeSize);
    }

    private parseIngredientsDatabase(input: string): IngredientsDatabase {
        const ranges: { start: bigint; end: bigint }[] = [];
        const ids: number[] = [];
        for (const line of input.split("\n")) {
            if (line.length === 0) {
                continue;
            }

            const isRangeRegex = /^\d+-\d+$/m;
            if (isRangeRegex.test(line)) {
                ranges.push({
                    start: BigInt(line.split("-")[0] ?? "0"),
                    end: BigInt(line.split("-")[1] ?? "0"),
                });
            } else {
                ids.push(parseInt(line ?? "0", 10));
            }
        }

        return {
            ranges: ranges,
            ids: ids,
        } satisfies IngredientsDatabase;
    }

    private isInRange(id: number, ranges: { start: bigint; end: bigint }[]): boolean {
        for (const range of ranges) {
            if (BigInt(id) >= range.start && BigInt(id) <= range.end) {
                return true;
            }
        }

        return false;
    }
}
