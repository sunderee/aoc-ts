import type { Solution } from "../../common";

export class Day01Year2015 implements Solution {
    first(input: string): number {
        let floor: number = 0;
        input.split("").forEach((item) => {
            if (item === "(") {
                floor += 1;
            } else {
                floor -= 1;
            }
        });

        return floor;
    }

    second(input: string): number {
        let floor: number = 0;
        for (let i = 0; i < input.split("").length; i++) {
            const item = input.split("")[i];

            if (item === "(") {
                floor += 1;
            } else {
                floor -= 1;
            }

            if (floor === -1) {
                return i + 1;
            }
        }

        return -1;
    }
}
