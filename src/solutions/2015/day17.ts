import { combinations, type Solution } from "../../common";

export class Day17Year2015 implements Solution {
    first(input: string, options?: { [key: string]: unknown }): number {
        const maxContainerSize = (options?.["maxContainerSize"] as number | undefined | null) ?? 150;
        const containers = input.split("\n").map((container) => parseInt(container, 10));

        return this.allPossibleCombinations(containers, maxContainerSize);
    }

    second(input: string, options?: { [key: string]: unknown }): number {
        const maxContainerSize = (options?.["maxContainerSize"] as number | undefined | null) ?? 150;
        const containers = input.split("\n").map((container) => parseInt(container, 10));

        return this.minimumPossibleCombinations(containers, maxContainerSize);
    }

    private allPossibleCombinations(containers: number[], maxContainerSize: number): number {
        const combinationsOfContainers = combinations(containers);
        return combinationsOfContainers
            .map((item) => item.reduce((accumulator, current) => accumulator + current, 0))
            .filter((item) => item === maxContainerSize)
            .toArray().length;
    }

    private minimumPossibleCombinations(containers: number[], maxContainerSize: number): number {
        const combinationsOfContainers = combinations(containers).toArray();
        const validCombinations = combinationsOfContainers.filter(
            (item) => item.reduce((accumulator, current) => accumulator + current, 0) === maxContainerSize,
        );

        if (validCombinations.length === 0) {
            return 0;
        }

        const minLength = Math.min(...validCombinations.map((item) => item.length));
        return validCombinations.filter((item) => item.length === minLength).length;
    }
}
