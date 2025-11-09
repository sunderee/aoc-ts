import type { Solution } from "../../common";

export class Day12Year2015 implements Solution {
    first(input: string): number {
        const numbersRegex = /-?\d+/g;
        const numbers = input.match(numbersRegex);
        if (numbers === null) {
            return 0;
        }

        return numbers.reduce((acc, number) => acc + parseInt(number, 10), 0);
    }

    second(input: string): number {
        const json = JSON.parse(input);
        return this.sumWithoutRed(json);
    }

    private sumWithoutRed(value: unknown): number {
        if (typeof value === "number") {
            return value;
        }
        if (Array.isArray(value)) {
            return value.reduce<number>((total, item) => total + this.sumWithoutRed(item), 0);
        }
        if (typeof value === "object" && value !== null) {
            const objectValues = Object.values(value as Record<string, unknown>);
            if (objectValues.includes("red")) {
                return 0;
            }
            return objectValues.reduce<number>((total, item) => total + this.sumWithoutRed(item), 0);
        }
        return 0;
    }
}
