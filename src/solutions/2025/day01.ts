import type { Solution } from "../../common";

export class Day01Year2025 implements Solution {
    first(input: string): number {
        let currentPosition = 50;
        let numberOfTimesItReached0 = 0;

        input
            .split("\n")
            .map((line) => this.parseInstruction(line))
            .forEach((instruction) => {
                if (instruction.direction === "left") {
                    currentPosition = (currentPosition - instruction.turns) % 100;
                    if (currentPosition < 0) {
                        currentPosition += 100;
                    }
                } else {
                    currentPosition = (currentPosition + instruction.turns) % 100;
                }

                if (currentPosition === 0) {
                    numberOfTimesItReached0++;
                }
            });

        return numberOfTimesItReached0;
    }

    second(input: string): number {
        let currentPosition = 50;
        let numberOfTimesItReached0 = 0;

        input
            .split("\n")
            .map((line) => this.parseInstruction(line))
            .forEach((instruction) => {
                if (instruction.direction === "left") {
                    const nextPosition = currentPosition - instruction.turns;
                    numberOfTimesItReached0 +=
                        Math.floor((currentPosition - 1) / 100) - Math.floor((nextPosition - 1) / 100);
                    currentPosition = nextPosition;
                } else {
                    const nextPosition = currentPosition + instruction.turns;
                    numberOfTimesItReached0 += Math.floor(nextPosition / 100) - Math.floor(currentPosition / 100);
                    currentPosition = nextPosition;
                }
            });

        return numberOfTimesItReached0;
    }

    private parseInstruction(line: string) {
        const direction: "left" | "right" = line.startsWith("L") ? "left" : "right";
        const turns = Number(line.slice(1));

        return { direction, turns };
    }
}
