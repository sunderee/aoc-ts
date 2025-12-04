import type { Solution } from "../../common";

type Cell = { x: number; y: number; type: "empty" | "paper-roll" };

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
        const rawGrid = input.split("\n").map((line) => line.split(""));
        const grid: Cell[] = [];
        let numberOfPaperRollsAccessibleToForklift = 0;
        for (let y = 0; y < rawGrid.length; y++) {
            for (let x = 0; x < rawGrid[y]!.length; x++) {
                grid.push({ x, y, type: rawGrid[y]![x]! === "." ? "empty" : "paper-roll" });
            }
        }

        for (const cell of grid) {
            if (cell.type === "paper-roll") {
                const isAccessible = this.hasLessThanFourAdjacentPaperRolls(grid, cell);
                if (isAccessible) {
                    numberOfPaperRollsAccessibleToForklift++;
                }
            }
        }

        return numberOfPaperRollsAccessibleToForklift;
    }

    second(input: string): number {
        const rawGrid = input.split("\n").map((line) => line.split(""));

        let numberOfRemovedPaperRolls = 0;
        let paperRollsCanBeRemoved = true;
        while (paperRollsCanBeRemoved) {
            const grid: Cell[] = [];
            for (let y = 0; y < rawGrid.length; y++) {
                for (let x = 0; x < rawGrid[y]!.length; x++) {
                    grid.push({ x, y, type: rawGrid[y]![x]! === "." ? "empty" : "paper-roll" });
                }
            }

            const accessibleCells: Cell[] = [];
            for (const cell of grid) {
                if (cell.type === "paper-roll") {
                    const isAccessible = this.hasLessThanFourAdjacentPaperRolls(grid, cell);
                    if (isAccessible) {
                        accessibleCells.push(cell);
                    }
                }
            }

            if (accessibleCells.length === 0) {
                paperRollsCanBeRemoved = false;
            } else {
                numberOfRemovedPaperRolls += accessibleCells.length;
                for (const cell of accessibleCells) {
                    rawGrid[cell.y]![cell.x] = ".";
                }
            }
        }

        return numberOfRemovedPaperRolls;
    }

    private hasLessThanFourAdjacentPaperRolls(grid: Cell[], cell: Cell): boolean {
        const adjacentCells = this.getAdjacentCells(grid, cell);
        const numberOfAdjacentPaperRolls = adjacentCells.filter((cell) => cell.type === "paper-roll").length;
        return numberOfAdjacentPaperRolls < 4;
    }

    private getAdjacentCells(grid: Cell[], cell: Cell): Cell[] {
        const adjacentCells: Cell[] = [];
        for (const direction of Day04Year2025.DIRECTIONS) {
            const adjacentCell = {
                x: cell.x + direction.x,
                y: cell.y + direction.y,
                type: grid.find((c) => c.x === cell.x + direction.x && c.y === cell.y + direction.y)?.type ?? "empty",
            };
            const existsInGrid = grid.find((c) => c.x === adjacentCell.x && c.y === adjacentCell.y);

            if (existsInGrid) {
                adjacentCells.push(existsInGrid);
            }
        }

        return adjacentCells;
    }
}
