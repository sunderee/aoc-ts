import type { Solution } from "../../common";

export class Day04Year2025 implements Solution {
    static readonly DIRECTIONS = [
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: -1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
    ];

    first(input: string): number {
        const grid = input.split("\n").map((line) => line.split(""));
        let numberOfPaperRollsAccessibleToForklift = 0;

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y]!.length; x++) {
                if (grid[y]![x] === "@") {
                    const adjacentPaperRolls = this.countAdjacentPaperRolls(grid, x, y);
                    if (adjacentPaperRolls < 4) {
                        numberOfPaperRollsAccessibleToForklift++;
                    }
                }
            }
        }

        return numberOfPaperRollsAccessibleToForklift;
    }

    second(input: string): number {
        const grid = input.split("\n").map((line) => line.split(""));
        let numberOfRemovedPaperRolls = 0;

        while (true) {
            const accessibleCells: Array<{ x: number; y: number }> = [];

            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[y]!.length; x++) {
                    if (grid[y]![x] === "@") {
                        const adjacentPaperRolls = this.countAdjacentPaperRolls(grid, x, y);
                        if (adjacentPaperRolls < 4) {
                            accessibleCells.push({ x, y });
                        }
                    }
                }
            }

            if (accessibleCells.length === 0) {
                break;
            }

            numberOfRemovedPaperRolls += accessibleCells.length;
            for (const cell of accessibleCells) {
                grid[cell.y]![cell.x] = ".";
            }
        }

        return numberOfRemovedPaperRolls;
    }

    private countAdjacentPaperRolls(grid: string[][], x: number, y: number): number {
        let count = 0;
        for (const direction of Day04Year2025.DIRECTIONS) {
            const nx = x + direction.x;
            const ny = y + direction.y;
            if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[ny]!.length) {
                if (grid[ny]![nx] === "@") {
                    count++;
                }
            }
        }
        return count;
    }
}
