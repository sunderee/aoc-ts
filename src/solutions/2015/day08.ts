import type { Solution } from "../../common";

export class Day08Year2015 implements Solution {
    first(input: string): number {
        return input.split("\n").reduce((acc, line) => acc + this.codeCharactersMinusInMemoryCharacters(line), 0);
    }

    second(input: string): number {
        return input.split("\n").reduce((acc, line) => acc + this.additionalEncodingMinusCodeCharacters(line), 0);
    }

    private codeCharactersMinusInMemoryCharacters(line: string): number {
        const codeLength = line.length; // Includes quotes
        let inMemoryLength = 0;

        for (let i = 1; i < line.length - 1; i++) {
            if (line[i] === "\\") {
                if (line[i + 1] === "\\" || line[i + 1] === '"') {
                    i += 1; // Skip the escaped character
                } else if (line[i + 1] === "x" && i + 3 < line.length) {
                    i += 3; // Skip \xNN
                }
            }
            inMemoryLength++;
        }

        return codeLength - inMemoryLength;
    }

    private additionalEncodingMinusCodeCharacters(line: string): number {
        const codeLength = line.length; // Original code length
        let encodedLength = 2; // Start and end quotes

        for (const char of line) {
            if (char === '"' || char === "\\") {
                encodedLength += 2;
            } else {
                encodedLength += 1;
            }
        }

        return encodedLength - codeLength;
    }
}
