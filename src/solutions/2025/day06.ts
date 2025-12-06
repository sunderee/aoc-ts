import type { Solution } from "../../common";

interface CephalopodColumn {
    numbers: number[];
    operation: "multiplication" | "addition";
}

export class Day06Year2025 implements Solution {
    first(input: string): number {
        const allLines = input.split("\n");
        const numberOfColumns = input.split("\n")[0]!.matchAll(/\d+/g)!.toArray()!.length;

        const numberOfRows = allLines.length - 1;

        const cephalopodColumns: CephalopodColumn[] = [];
        for (let i = 0; i < numberOfColumns; i++) {
            const numbers: number[] = [];
            for (let j = 0; j < numberOfRows; j++) {
                const fullLine = allLines[j];
                if (fullLine === undefined) {
                    throw new Error(`Undefined line for ${j}`);
                }

                const candidate = fullLine.matchAll(/\d+/g)!.toArray()![i];
                if (candidate === undefined) {
                    throw new Error(`Undefined candidate for ${j} in column ${i}`);
                }

                numbers.push(parseInt(candidate[0]!, 10));
            }

            const operation = allLines[numberOfRows]!.matchAll(/\+|\*/g)!.toArray()![i];
            if (operation === undefined) {
                throw new Error(`Undefined operation for column ${i}`);
            }

            cephalopodColumns.push({ numbers, operation: operation[0] === "+" ? "addition" : "multiplication" });
        }

        return cephalopodColumns
            .map((column) => this.calculateColumnValue(column))
            .reduce((accumulator, value) => accumulator + value, 0);
    }

    second(input: string): number {
        const allLines = input.split("\n").filter((line) => line.length > 0);
        if (allLines.length === 0) {
            return 0;
        }

        const maximumWidth = Math.max(...allLines.map((line) => line.length));

        const grid: string[][] = [];
        for (const line of allLines) {
            const paddedLine = line.padEnd(maximumWidth, " ");
            grid.push(paddedLine.split(""));
        }

        const numberOfRows = grid.length;
        const numberOfColumns = maximumWidth;
        const operatorRowIndex = numberOfRows - 1;

        const isBlankColumn = (currentColumnIndex: number): boolean => {
            for (let row = 0; row < numberOfRows; row++) {
                const characterCandidate = grid[row]![currentColumnIndex];
                if (characterCandidate !== undefined && characterCandidate !== " ") {
                    return false;
                }
            }

            return true;
        };

        const problems: Array<{ columns: number[]; operator: string }> = [];
        let currentProblem: number[] | null = null;

        for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
            if (isBlankColumn(columnIndex)) {
                if (currentProblem !== null && currentProblem.length > 0) {
                    const columnOperator = currentProblem.find((c) => {
                        const character = grid[operatorRowIndex]![c];
                        return character === "+" || character === "*";
                    });

                    if (columnOperator !== undefined) {
                        const operator = grid[operatorRowIndex]![columnOperator]!;
                        problems.push({ columns: currentProblem, operator });
                    }
                }
                currentProblem = null;
            } else {
                if (currentProblem === null) {
                    currentProblem = [];
                }

                currentProblem.push(columnIndex);
            }
        }

        if (currentProblem !== null && currentProblem.length > 0) {
            const columnOperatorIndex = currentProblem.find(
                (item) => grid[operatorRowIndex]![item] === "+" || grid[operatorRowIndex]![item] === "*",
            );

            if (columnOperatorIndex !== undefined) {
                const operator = grid[operatorRowIndex]![columnOperatorIndex]!;
                problems.push({ columns: currentProblem, operator });
            }
        }

        let result = 0;
        for (let problemIndex = problems.length - 1; problemIndex >= 0; problemIndex--) {
            const problem = problems[problemIndex]!;
            const numbers: number[] = [];
            for (let i = problem.columns.length - 1; i >= 0; i--) {
                const columnIndex = problem.columns[i]!;
                let numberString = "";
                for (let row = 0; row < operatorRowIndex; row++) {
                    const character = grid[row]![columnIndex];
                    if (character !== undefined && character !== " ") {
                        numberString += character;
                    }
                }

                if (numberString.length > 0) {
                    numbers.push(parseInt(numberString, 10));
                }
            }

            const operation = problem.operator === "+" ? "addition" : "multiplication";
            const problemResult = this.calculateColumnValue({ numbers, operation });
            result += problemResult;
        }

        return result;
    }

    private calculateColumnValue(column: CephalopodColumn): number {
        if (column.operation === "addition") {
            return column.numbers.reduce((accumulator, number) => accumulator + number, 0);
        } else {
            return column.numbers.reduce((accumulator, number) => accumulator * number, 1);
        }
    }
}
