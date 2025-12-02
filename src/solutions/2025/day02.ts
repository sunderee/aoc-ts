import type { Solution } from "../../common";

type Range = { from: number; to: number };

export class Day02Year2025 implements Solution {
    first(input: string): number {
        return input
            .split(",")
            .map((item) => item.split("-"))
            .map(
                (rawRange) =>
                    ({ from: parseInt(rawRange[0] ?? "0", 10), to: parseInt(rawRange[1] ?? "0", 10) }) satisfies Range,
            )
            .map((range) => this.findAndAddInvalidIDsRepeatedTwice(range))
            .reduce((accumulator, current) => accumulator + current, 0);
    }

    second(input: string): number {
        return input
            .split(",")
            .map((item) => item.split("-"))
            .map(
                (rawRange) =>
                    ({ from: parseInt(rawRange[0] ?? "0", 10), to: parseInt(rawRange[1] ?? "0", 10) }) satisfies Range,
            )
            .map((range) => this.findAllInvalidIDsRepeatedAtLeastTwice(range))
            .reduce((accumulator, current) => accumulator + current, 0);
    }

    private findAndAddInvalidIDsRepeatedTwice(range: Range): number {
        const invalidIDs: number[] = [];

        for (let i = range.from; i <= range.to; i++) {
            const candidate = i.toString();
            const repetitionRegex = /^([1-9]\d*)\1$/;
            if (repetitionRegex.test(candidate)) {
                invalidIDs.push(i);
            }
        }

        return invalidIDs.length === 0 ? 0 : invalidIDs.reduce((accumulator, current) => accumulator + current, 0);
    }

    private findAllInvalidIDsRepeatedAtLeastTwice(range: Range): number {
        const invalidIDs: number[] = [];

        for (let i = range.from; i <= range.to; i++) {
            const candidate = i.toString();
            const repetitionRegex = /^([1-9]\d*)\1+$/;
            if (repetitionRegex.test(candidate)) {
                invalidIDs.push(i);
            }
        }

        return invalidIDs.length === 0 ? 0 : invalidIDs.reduce((accumulator, current) => accumulator + current, 0);
    }
}
