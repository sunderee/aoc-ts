import type { Solution } from "../../common";

export class Day03Year2025 implements Solution {
    first(input: string): number {
        return input
            .split("\n")
            .map((item) => this.findHighestJoltage(item, 2))
            .reduce((accumulator, current) => accumulator + current, 0);
    }

    second(input: string): number {
        return input
            .split("\n")
            .map((item) => this.findHighestJoltage(item, 12))
            .reduce((accumulator, current) => accumulator + current, 0);
    }

    private findHighestJoltage(line: string, digitsToKeep: number): number {
        const stack: string[] = [];

        for (let i = 0; i < line.length; i++) {
            const digit = line[i];
            if (digit === undefined) {
                throw Error(`Undefined digit for ${line} at ${i}`);
            }

            while (
                stack.length > 0 &&
                (stack[stack.length - 1] ?? "") < digit &&
                line.length - i + stack.length > digitsToKeep
            ) {
                stack.pop();
            }

            if (stack.length < digitsToKeep) {
                stack.push(digit);
            }
        }

        const result = stack.join("");
        return parseInt(result, 10);
    }
}
