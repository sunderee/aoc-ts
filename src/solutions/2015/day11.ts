import type { Solution } from "../../common";

export class Day11Year2015 implements Solution {
    first(input: string): string {
        let currentInput = input;
        let foundRightPassword = false;
        while (!foundRightPassword) {
            currentInput = this.incrementInputString(currentInput);
            foundRightPassword = this.testPasswordPart1(currentInput);
        }

        return currentInput;
    }

    // Note, the input has to be the output of part 1.
    second(input: string): string {
        let currentInput = this.incrementInputString(input);
        let foundRightPassword = false;
        while (!foundRightPassword) {
            currentInput = this.incrementInputString(currentInput);
            foundRightPassword = this.testPasswordPart1(currentInput);
        }

        return currentInput;
    }

    private incrementInputString(input: string): string {
        if (!input || !/^[a-z]+$/.test(input)) {
            throw new Error("Input must be a non-empty string of lowercase letters");
        }

        let result = "";
        let carry = 1;

        // Process from right to left
        for (let i = input.length - 1; i >= 0; i--) {
            if (carry === 0) {
                result = input.substring(0, i + 1) + result;
                break;
            }

            const charCode = input.charCodeAt(i);
            const digit = charCode - 97; // Convert 'a'=0, 'b'=1, ..., 'z'=25
            const newDigit = digit + carry;

            if (newDigit > 25) {
                // Overflow: set to 'a' and continue carrying
                result = `${"a"}${result}`;
                carry = 1;
            } else {
                // No overflow: add the new character
                result = String.fromCharCode(97 + newDigit) + result;
                carry = 0;
            }
        }

        // If we still have carry, prepend 'a'
        if (carry === 1) {
            result = `${"a"}${result}`;
        }

        return result;
    }

    private testPasswordPart1(input: string): boolean {
        // Rule 1: Must include one increasing straight of at least three letters
        const increasingStraights = [
            "abc",
            "bcd",
            "cde",
            "def",
            "efg",
            "fgh",
            "ghi",
            "hij",
            "ijk",
            "jkl",
            "klm",
            "lmn",
            "mno",
            "nop",
            "opq",
            "pqr",
            "qrs",
            "rst",
            "stu",
            "tuv",
            "uvw",
            "vwx",
            "wxy",
            "xyz",
        ];
        const hasIncreasingStraight = increasingStraights.some((straight) => input.includes(straight));

        // Rule 2: May not contain i, o, or l
        const hasNoForbiddenLetters = !/[iol]/.test(input);

        // Rule 3: Must contain at least two different, non-overlapping pairs
        const hasTwoPairs =
            /([a-z])\1.*([a-z])\2/.test(input) &&
            // Ensure the pairs are different letters
            (() => {
                const matches = input.match(/([a-z])\1/g);
                if (!matches || matches.length < 2) return false;
                return new Set(matches).size >= 2;
            })();

        return hasIncreasingStraight && hasNoForbiddenLetters && hasTwoPairs;
    }
}
