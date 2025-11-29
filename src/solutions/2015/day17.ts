import { combinations, type Solution } from "../../common";
import { uniqueArrays } from "../../common/utilities/unique-arrays";

export class Day17Year2015 implements Solution {
    first(input: string, options?: { [key: string]: unknown }): number {
        const maxContainerSize = (options?.["maxContainerSize"] as number | undefined | null) ?? 150;
        const containers = input.split("\n").map((container) => parseInt(container, 10));

        return this.allPossibleCombinations(containers, maxContainerSize);
    }

    second(input: string, options?: { [key: string]: unknown }): number {
        const maxContainerSize = (options?.["maxContainerSize"] as number | undefined | null) ?? 150;
        const containers = input.split("\n").map((container) => parseInt(container, 10));

        return this.allPossibleUniqueCombinations(containers, maxContainerSize);
    }

    private allPossibleCombinations(containers: number[], maxContainerSize: number): number {
        const combinationsOfContainers = combinations(containers);
        return combinationsOfContainers
            .map((item) => item.reduce((accumulator, current) => accumulator + current, 0))
            .filter((item) => item === maxContainerSize)
            .toArray().length;
    }

    private allPossibleUniqueCombinations(containers: number[], maxContainerSize: number): number {
        const combinationsOfContainers = combinations(containers).toArray();
        const uniqueCombinationsOfContainers = uniqueArrays(combinationsOfContainers);
        return uniqueCombinationsOfContainers
            .map((item) => item.reduce((accumulator, current) => accumulator + current, 0))
            .filter((item) => item === maxContainerSize).length;
    }
}
