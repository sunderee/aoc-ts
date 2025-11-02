import type { Solution } from "../../common";

export class Day10Year2015 implements Solution {
    first(input: string): number {
        let lengthOfTheResult = input.length;
        for (let i = 0; i < 40; i++) {
            input = this.lookAndSay(input);
            lengthOfTheResult = input.length;
        }

        return lengthOfTheResult;
    }

    second(input: string): number {
        let lengthOfTheResult = input.length;
        for (let i = 0; i < 50; i++) {
            input = this.lookAndSay(input);
            lengthOfTheResult = input.length;
        }

        return lengthOfTheResult;
    }

    private lookAndSay(input: string): string {
        let result = "";
        let i = 0;
        while (i < input.length) {
            const currentChar = input[i];
            let count = 1;
            while (i + count < input.length && input[i + count] === currentChar) {
                count++;
            }

            result += count.toString() + currentChar;
            i += count;
        }

        return result;
    }
}
