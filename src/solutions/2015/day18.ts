import type { Point2D, Solution } from "../../common";

export class Day18Year2015 implements Solution {
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

    first(input: string, options?: { [key: string]: unknown }): number {
        const grid = input.split("\n").map((line) => line.split(""));

        let numberOfStepsLeft = (options?.["numberOfSteps"] as number | undefined) ?? 100;
        while (numberOfStepsLeft > 0) {
            const locationsOfCellsToTurnOn = new Set<Point2D>();
            const locationsOfCellsToTurnOff = new Set<Point2D>();

            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[y]!.length; x++) {
                    const isTurnedOn = grid[y]![x] === "#";
                    if (isTurnedOn) {
                        const numberOfNeighborsTurnedOn = this.countNeighborsTurnedOn(grid, x, y);
                        if (numberOfNeighborsTurnedOn < 2 || numberOfNeighborsTurnedOn > 3) {
                            locationsOfCellsToTurnOff.add({ x, y });
                        }
                    } else {
                        const numberOfNeighborsTurnedOn = this.countNeighborsTurnedOn(grid, x, y);
                        if (numberOfNeighborsTurnedOn === 3) {
                            locationsOfCellsToTurnOn.add({ x, y });
                        }
                    }
                }
            }

            for (const location of locationsOfCellsToTurnOff) {
                grid[location.y]![location.x] = ".";
            }

            for (const location of locationsOfCellsToTurnOn) {
                grid[location.y]![location.x] = "#";
            }

            numberOfStepsLeft--;
        }

        return grid.flat().filter((cell) => cell === "#").length;
    }

    second(input: string, options?: { [key: string]: unknown }): number {
        const grid = input.split("\n").map((line) => line.split(""));
        const maxX = grid[0]!.length - 1;
        const maxY = grid.length - 1;

        grid[0]![0] = "#";
        grid[0]![maxX] = "#";
        grid[maxY]![0] = "#";
        grid[maxY]![maxX] = "#";

        let numberOfStepsLeft = (options?.["numberOfSteps"] as number | undefined) ?? 100;
        while (numberOfStepsLeft > 0) {
            const locationsOfCellsToTurnOn = new Set<Point2D>();
            const locationsOfCellsToTurnOff = new Set<Point2D>();

            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[y]!.length; x++) {
                    const isCorner =
                        (x === 0 && y === 0) ||
                        (x === maxX && y === 0) ||
                        (x === 0 && y === maxY) ||
                        (x === maxX && y === maxY);

                    if (isCorner) {
                        continue;
                    }

                    const isTurnedOn = grid[y]![x] === "#";
                    if (isTurnedOn) {
                        const numberOfNeighborsTurnedOn = this.countNeighborsTurnedOn(grid, x, y);
                        if (numberOfNeighborsTurnedOn < 2 || numberOfNeighborsTurnedOn > 3) {
                            locationsOfCellsToTurnOff.add({ x, y });
                        }
                    } else {
                        const numberOfNeighborsTurnedOn = this.countNeighborsTurnedOn(grid, x, y);
                        if (numberOfNeighborsTurnedOn === 3) {
                            locationsOfCellsToTurnOn.add({ x, y });
                        }
                    }
                }
            }

            for (const location of locationsOfCellsToTurnOff) {
                grid[location.y]![location.x] = ".";
            }

            for (const location of locationsOfCellsToTurnOn) {
                grid[location.y]![location.x] = "#";
            }

            grid[0]![0] = "#";
            grid[0]![maxX] = "#";
            grid[maxY]![0] = "#";
            grid[maxY]![maxX] = "#";

            numberOfStepsLeft--;
        }

        return grid.flat().filter((cell) => cell === "#").length;
    }

    private countNeighborsTurnedOn(grid: string[][], x: number, y: number): number {
        let count = 0;
        for (const direction of Day18Year2015.DIRECTIONS) {
            const nx = x + direction.x;
            const ny = y + direction.y;
            if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[ny]!.length) {
                if (grid[ny]![nx] === "#") {
                    count++;
                }
            }
        }

        return count;
    }
}
