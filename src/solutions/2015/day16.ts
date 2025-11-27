import type { Solution } from "../../common";

type AuntSue = {
    number: number;
    children?: number;
    cats?: number;
    samoyeds?: number;
    pomeranians?: number;
    akitas?: number;
    vizslas?: number;
    goldfish?: number;
    trees?: number;
    cars?: number;
    perfumes?: number;
};

export class Day16Year2015 implements Solution {
    first(input: string): number {
        const target = {
            children: 3,
            cats: 7,
            samoyeds: 2,
            pomeranians: 3,
            akitas: 0,
            vizslas: 0,
            goldfish: 5,
            trees: 3,
            cars: 2,
            perfumes: 1,
        };

        return (
            input
                .split("\n")
                .map((item) => this.parseAuntSue(item))
                .find((aunt) => {
                    for (const key of Object.keys(aunt)) {
                        if (key === "number") {
                            continue;
                        }

                        if (aunt[key as keyof typeof target] !== target[key as keyof typeof target]) {
                            return false;
                        }
                    }

                    return true;
                })?.number ?? -1
        );
    }

    second(input: string): number {
        const target = {
            children: 3,
            cats: 7,
            samoyeds: 2,
            pomeranians: 3,
            akitas: 0,
            vizslas: 0,
            goldfish: 5,
            trees: 3,
            cars: 2,
            perfumes: 1,
        };

        return (
            input
                .split("\n")
                .map((item) => this.parseAuntSue(item))
                .find((aunt) => {
                    for (const key of Object.keys(aunt)) {
                        if (key === "number") {
                            continue;
                        }

                        const typedKey = key as keyof typeof target;
                        const value = aunt[typedKey];
                        const targetValue = target[typedKey];

                        if (value === undefined) {
                            continue;
                        }

                        if (typedKey === "cats" || typedKey === "trees") {
                            if (value <= targetValue) return false;
                        } else if (typedKey === "pomeranians" || typedKey === "goldfish") {
                            if (value >= targetValue) return false;
                        } else {
                            if (value !== targetValue) return false;
                        }
                    }

                    return true;
                })?.number ?? -1
        );
    }

    private parseAuntSue(line: string): AuntSue {
        const match = line.match(/^Sue (\d+): (.*)$/);
        if (match === null) {
            throw new Error(`Invalid aunt sue: ${line}`);
        }

        const numberMatch = match[1];
        if (numberMatch === undefined) {
            throw new Error(`Invalid aunt sue: ${line}`);
        }

        const propertyStringMatch = match[2];
        if (propertyStringMatch === undefined) {
            throw new Error(`Invalid aunt sue: ${line}`);
        }

        const number = parseInt(numberMatch, 10);
        const propertyString = propertyStringMatch;

        return propertyString.split(", ").reduce<AuntSue>(
            (aunt, property) => {
                const [key, value] = property.split(": ");
                if (key && value) {
                    aunt[key as keyof AuntSue] = parseInt(value, 10);
                }

                return aunt;
            },
            { number },
        );
    }
}
