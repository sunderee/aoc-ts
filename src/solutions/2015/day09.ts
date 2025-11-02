import { DirectedWeightedGraph, type Solution } from "../../common";

export class Day09Year2015 implements Solution {
    first(input: string): number {
        const graph = new DirectedWeightedGraph<string>();
        const parsedLines = input
            .split("\n")
            .map((item) => item.trim())
            .filter((item) => item.length > 0)
            .map((item) => this.parseLine(item));

        for (const line of parsedLines) {
            graph.addEdge(line.from, line.to, line.distance);
            graph.addEdge(line.to, line.from, line.distance);
        }

        const shortestPath = graph.findShortestHamiltonianPath();
        return shortestPath?.distance ?? Infinity;
    }

    second(input: string): number {
        const graph = new DirectedWeightedGraph<string>();
        const parsedLines = input
            .split("\n")
            .map((item) => item.trim())
            .filter((item) => item.length > 0)
            .map((item) => this.parseLine(item));

        for (const line of parsedLines) {
            graph.addEdge(line.from, line.to, line.distance);
            graph.addEdge(line.to, line.from, line.distance);
        }

        const longestPath = graph.findLongestHamiltonianPath();
        return longestPath?.distance ?? -1;
    }

    private parseLine(line: string): { from: string; to: string; distance: number } {
        const match = line.match(/^(\w+) to (\w+) = (\d+)$/);
        if (match === null) {
            throw new Error(`Unable to parse line: ${line}`);
        }

        return {
            from: match[1] as string,
            to: match[2] as string,
            distance: parseInt(match[3] as string, 10),
        };
    }
}
