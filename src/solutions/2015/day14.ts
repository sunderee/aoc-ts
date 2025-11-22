import type { Solution } from "../../common";

type RaindeerSpecification = {
    name: string;
    speed: number;
    flyDuration: number;
    restDuration: number;
};

export class Day14Year2015 implements Solution {
    first(input: string, options?: { [key: string]: unknown }): number {
        const flyDuration = options?.["flyDuration"] as number;

        const allDistances = input
            .split("\n")
            .map((item) => this.parseRaindeerSpecifications(item))
            .map((specification) => this.calculateRaindeerDistance(specification, flyDuration));
        return Math.max(...allDistances);
    }

    second(input: string, options?: { [key: string]: unknown }): number {
        const flyDuration = options?.["flyDuration"] as number;

        const specifications = input.split("\n").map((item) => this.parseRaindeerSpecifications(item));
        const scoreMap = new Map<string, number>();
        for (let i = 0; i <= flyDuration; i++) {
            if (i === 0) {
                for (const specification of specifications) {
                    scoreMap.set(specification.name, 0);
                }
                continue;
            }

            const raindeerDistances = specifications.map((specification) => [
                specification.name,
                this.calculateRaindeerDistance(specification, i),
            ]);
            const maxDistance = Math.max(...raindeerDistances.map((item) => (item.at(1) as number) ?? 0));
            for (const [name, distance] of raindeerDistances) {
                if (distance === maxDistance) {
                    scoreMap.set(name as string, (scoreMap.get(name as string) ?? 0) + 1);
                }
            }
        }

        return Math.max(...scoreMap.values());
    }

    private parseRaindeerSpecifications(line: string): RaindeerSpecification {
        const specificationRegex =
            /([A-Za-z]+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./;
        const match = line.match(specificationRegex);
        if (match === null) {
            throw new Error("Invalid input");
        }

        return {
            name: match[1] as string,
            speed: parseInt(match[2] as string, 10),
            flyDuration: parseInt(match[3] as string, 10),
            restDuration: parseInt(match[4] as string, 10),
        };
    }

    private calculateRaindeerDistance(specification: RaindeerSpecification, timeInSeconds: number): number {
        const howManyFullCycles = Math.floor(timeInSeconds / (specification.flyDuration + specification.restDuration));
        const remainingTime =
            timeInSeconds - howManyFullCycles * (specification.flyDuration + specification.restDuration);

        const distanceInFullCycles = howManyFullCycles * specification.speed * specification.flyDuration;
        const distanceInRemainingTime = specification.speed * Math.min(specification.flyDuration, remainingTime);

        return distanceInFullCycles + distanceInRemainingTime;
    }
}
