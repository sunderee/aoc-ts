import { describe, expect, it } from "bun:test";
import { DirectedWeightedGraph } from "./weighted-directed.graph";

describe("DirectedWeightedGraph", () => {
    describe("addNode", () => {
        it("should add a single node", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addNode("A");
            expect(graph.getNodes()).toEqual(["A"]);
        });

        it("should add multiple nodes", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addNode("A");
            graph.addNode("B");
            graph.addNode("C");
            expect(graph.getNodes()).toHaveLength(3);
            expect(graph.getNodes()).toContain("A");
            expect(graph.getNodes()).toContain("B");
            expect(graph.getNodes()).toContain("C");
        });

        it("should not add duplicate nodes", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addNode("A");
            graph.addNode("A");
            expect(graph.getNodes()).toEqual(["A"]);
        });

        it("should handle numeric node IDs", () => {
            const graph = new DirectedWeightedGraph<number>();
            graph.addNode(1);
            graph.addNode(2);
            graph.addNode(3);
            expect(graph.getNodes()).toHaveLength(3);
            expect(graph.getNodes()).toContain(1);
            expect(graph.getNodes()).toContain(2);
            expect(graph.getNodes()).toContain(3);
        });

        it("should handle empty graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            expect(graph.getNodes()).toEqual([]);
        });
    });

    describe("addEdge", () => {
        it("should add an edge between two nodes", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 5);
            expect(graph.getNodes()).toContain("A");
            expect(graph.getNodes()).toContain("B");
            expect(graph.getEdgeWeight("A", "B")).toBe(5);
        });

        it("should create nodes if they don't exist", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("X", "Y", 10);
            expect(graph.getNodes()).toContain("X");
            expect(graph.getNodes()).toContain("Y");
            expect(graph.getEdgeWeight("X", "Y")).toBe(10);
        });

        it("should allow multiple edges from the same node", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 5);
            graph.addEdge("A", "C", 10);
            graph.addEdge("A", "D", 15);
            expect(graph.getEdgeWeight("A", "B")).toBe(5);
            expect(graph.getEdgeWeight("A", "C")).toBe(10);
            expect(graph.getEdgeWeight("A", "D")).toBe(15);
        });

        it("should allow self-loops", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "A", 3);
            expect(graph.getEdgeWeight("A", "A")).toBe(3);
        });

        it("should allow zero weight edges", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 0);
            expect(graph.getEdgeWeight("A", "B")).toBe(0);
        });

        it("should allow negative weight edges", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", -5);
            expect(graph.getEdgeWeight("A", "B")).toBe(-5);
        });

        it("should overwrite existing edge weight", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 5);
            graph.addEdge("A", "B", 10);
            expect(graph.getEdgeWeight("A", "B")).toBe(10);
        });

        it("should handle numeric node IDs", () => {
            const graph = new DirectedWeightedGraph<number>();
            graph.addEdge(1, 2, 42);
            expect(graph.getEdgeWeight(1, 2)).toBe(42);
        });
    });

    describe("getNodes", () => {
        it("should return empty array for empty graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            expect(graph.getNodes()).toEqual([]);
        });

        it("should return all nodes", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addNode("A");
            graph.addNode("B");
            graph.addNode("C");
            const nodes = graph.getNodes();
            expect(nodes).toHaveLength(3);
            expect(nodes).toContain("A");
            expect(nodes).toContain("B");
            expect(nodes).toContain("C");
        });

        it("should return nodes added via edges", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("X", "Y", 1);
            graph.addEdge("Y", "Z", 2);
            const nodes = graph.getNodes();
            expect(nodes).toHaveLength(3);
            expect(nodes).toContain("X");
            expect(nodes).toContain("Y");
            expect(nodes).toContain("Z");
        });
    });

    describe("getEdgeWeight", () => {
        it("should return weight for existing edge", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 7);
            expect(graph.getEdgeWeight("A", "B")).toBe(7);
        });

        it("should return undefined for non-existent edge", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addNode("A");
            graph.addNode("B");
            expect(graph.getEdgeWeight("A", "B")).toBeUndefined();
        });

        it("should return undefined for non-existent source node", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addNode("B");
            expect(graph.getEdgeWeight("A", "B")).toBeUndefined();
        });

        it("should return undefined for non-existent target node", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addNode("A");
            expect(graph.getEdgeWeight("A", "B")).toBeUndefined();
        });

        it("should handle directed edges correctly", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 5);
            expect(graph.getEdgeWeight("A", "B")).toBe(5);
            expect(graph.getEdgeWeight("B", "A")).toBeUndefined();
        });
    });

    describe("shortestPath", () => {
        it("should find shortest path in simple two-node graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 5);
            const result = graph.shortestPath("A", "B");
            expect(result.distance).toBe(5);
            expect(result.path).toEqual(["A", "B"]);
        });

        it("should find shortest path in linear graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 2);
            graph.addEdge("B", "C", 3);
            graph.addEdge("C", "D", 1);
            const result = graph.shortestPath("A", "D");
            expect(result.distance).toBe(6);
            expect(result.path).toEqual(["A", "B", "C", "D"]);
        });

        it("should find shortest path when multiple paths exist", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 10);
            graph.addEdge("A", "C", 3);
            graph.addEdge("C", "B", 2);
            const result = graph.shortestPath("A", "B");
            expect(result.distance).toBe(5); // A -> C -> B (3 + 2)
            expect(result.path).toEqual(["A", "C", "B"]);
        });

        it("should handle path from node to itself", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addNode("A");
            const result = graph.shortestPath("A", "A");
            expect(result.distance).toBe(0);
            expect(result.path).toEqual(["A"]);
        });

        it("should handle unreachable node", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addNode("A");
            graph.addNode("B");
            const result = graph.shortestPath("A", "B");
            expect(result.distance).toBe(Infinity);
            expect(result.path).toEqual(["B"]);
        });

        it("should find shortest path in complex graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            // Graph structure:
            // A -> B (4)
            // A -> C (2)
            // B -> C (1)
            // B -> D (5)
            // C -> D (8)
            // C -> E (10)
            // D -> E (2)
            graph.addEdge("A", "B", 4);
            graph.addEdge("A", "C", 2);
            graph.addEdge("B", "C", 1);
            graph.addEdge("B", "D", 5);
            graph.addEdge("C", "D", 8);
            graph.addEdge("C", "E", 10);
            graph.addEdge("D", "E", 2);

            const result = graph.shortestPath("A", "E");
            // Shortest: A -> C -> D -> E (2 + 8 + 2 = 12)
            // Alternative: A -> B -> D -> E (4 + 5 + 2 = 11) <- shorter!
            expect(result.distance).toBe(11);
            expect(result.path).toEqual(["A", "B", "D", "E"]);
        });

        it("should handle single node graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addNode("A");
            const result = graph.shortestPath("A", "A");
            expect(result.distance).toBe(0);
            expect(result.path).toEqual(["A"]);
        });

        it("should handle numeric node IDs", () => {
            const graph = new DirectedWeightedGraph<number>();
            graph.addEdge(1, 2, 5);
            graph.addEdge(2, 3, 3);
            const result = graph.shortestPath(1, 3);
            expect(result.distance).toBe(8);
            expect(result.path).toEqual([1, 2, 3]);
        });

        it("should prefer shorter path over longer path", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 1);
            graph.addEdge("A", "C", 100);
            graph.addEdge("B", "D", 1);
            graph.addEdge("C", "D", 1);
            const result = graph.shortestPath("A", "D");
            expect(result.distance).toBe(2); // A -> B -> D
            expect(result.path).toEqual(["A", "B", "D"]);
        });
    });

    describe("findAllHamiltonianPaths", () => {
        it("should return empty array for empty graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            expect(graph.findAllHamiltonianPaths()).toEqual([]);
        });

        it("should return single node path for single node graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addNode("A");
            const paths = graph.findAllHamiltonianPaths();
            expect(paths).toHaveLength(1);
            expect(paths[0]?.path).toEqual(["A"]);
            expect(paths[0]?.distance).toBe(0);
        });

        it("should find all Hamiltonian paths in two-node graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 5);
            graph.addEdge("B", "A", 3);
            const paths = graph.findAllHamiltonianPaths();
            expect(paths).toHaveLength(2);
            expect(paths.some((p) => p.path[0] === "A" && p.path[1] === "B")).toBe(true);
            expect(paths.some((p) => p.path[0] === "B" && p.path[1] === "A")).toBe(true);
        });

        it("should find all Hamiltonian paths in three-node complete graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 1);
            graph.addEdge("A", "C", 2);
            graph.addEdge("B", "A", 3);
            graph.addEdge("B", "C", 4);
            graph.addEdge("C", "A", 5);
            graph.addEdge("C", "B", 6);
            const paths = graph.findAllHamiltonianPaths();
            // Should have 3! = 6 permutations
            expect(paths).toHaveLength(6);
            // Verify all paths visit all nodes exactly once
            for (const path of paths) {
                expect(path.path).toHaveLength(3);
                expect(new Set(path.path).size).toBe(3); // All unique
            }
        });

        it("should exclude paths with missing edges", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 1);
            graph.addEdge("B", "C", 2);
            // Missing edge from C to A, so only A->B->C is valid
            const paths = graph.findAllHamiltonianPaths();
            // Should only include paths where consecutive nodes have edges
            // A->B->C exists, but other permutations won't have all edges
            expect(paths.length).toBeGreaterThan(0);
            // All returned paths should have finite distance
            for (const path of paths) {
                expect(path.distance).not.toBe(Infinity);
            }
        });

        it("should calculate correct distances for paths", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 2);
            graph.addEdge("B", "C", 3);
            graph.addEdge("C", "A", 4);
            const paths = graph.findAllHamiltonianPaths();
            const pathABC = paths.find((p) => p.path[0] === "A" && p.path[1] === "B");
            expect(pathABC?.distance).toBe(5); // A->B->C: 2 + 3 = 5 (Hamiltonian paths don't include return edge)
        });

        it("should handle disconnected nodes", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 1);
            graph.addNode("C"); // Disconnected node
            const paths = graph.findAllHamiltonianPaths();
            // Should return empty array since no Hamiltonian path exists
            expect(paths).toEqual([]);
        });

        it("should handle numeric node IDs", () => {
            const graph = new DirectedWeightedGraph<number>();
            graph.addEdge(1, 2, 5);
            graph.addEdge(2, 1, 3);
            const paths = graph.findAllHamiltonianPaths();
            expect(paths).toHaveLength(2);
        });
    });

    describe("findShortestHamiltonianPath", () => {
        it("should return null for empty graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            expect(graph.findShortestHamiltonianPath()).toBeNull();
        });

        it("should return single node for single node graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addNode("A");
            const result = graph.findShortestHamiltonianPath();
            expect(result).not.toBeNull();
            expect(result?.path).toEqual(["A"]);
            expect(result?.distance).toBe(0);
        });

        it("should find shortest Hamiltonian path in simple graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 1);
            graph.addEdge("B", "A", 10);
            const result = graph.findShortestHamiltonianPath();
            expect(result).not.toBeNull();
            expect(result?.distance).toBe(1); // A -> B is shorter than B -> A
        });

        it("should find shortest Hamiltonian path in three-node graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            // Create asymmetric weights to test shortest path selection
            graph.addEdge("A", "B", 1);
            graph.addEdge("A", "C", 100);
            graph.addEdge("B", "A", 100);
            graph.addEdge("B", "C", 1);
            graph.addEdge("C", "A", 1);
            graph.addEdge("C", "B", 100);
            const result = graph.findShortestHamiltonianPath();
            expect(result).not.toBeNull();
            // Should find the path with minimum total distance
            expect(result?.distance).toBeLessThan(Infinity);
            expect(result?.path).toHaveLength(3);
        });

        it("should return null when no Hamiltonian path exists", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addNode("A");
            graph.addNode("B");
            // No edges, so no Hamiltonian path
            expect(graph.findShortestHamiltonianPath()).toBeNull();
        });

        it("should prefer shorter paths over longer ones", () => {
            const graph = new DirectedWeightedGraph<string>();
            // Path 1: A->B->C = 1+1 = 2
            // Path 2: A->C->B = 10+10 = 20
            // Hamiltonian paths visit all nodes exactly once (n-1 edges for n nodes)
            graph.addEdge("A", "B", 1);
            graph.addEdge("B", "C", 1);
            graph.addEdge("C", "A", 1);
            graph.addEdge("A", "C", 10);
            graph.addEdge("C", "B", 10);
            graph.addEdge("B", "A", 10);
            const result = graph.findShortestHamiltonianPath();
            expect(result?.distance).toBe(2); // A->B->C is shortest
        });
    });

    describe("findLongestHamiltonianPath", () => {
        it("should return null for empty graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            expect(graph.findLongestHamiltonianPath()).toBeNull();
        });

        it("should return single node for single node graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addNode("A");
            const result = graph.findLongestHamiltonianPath();
            expect(result).not.toBeNull();
            expect(result?.path).toEqual(["A"]);
            expect(result?.distance).toBe(0);
        });

        it("should find longest Hamiltonian path in simple graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 1);
            graph.addEdge("B", "A", 10);
            const result = graph.findLongestHamiltonianPath();
            expect(result).not.toBeNull();
            expect(result?.distance).toBe(10); // B -> A is longer than A -> B
        });

        it("should find longest Hamiltonian path in three-node graph", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", 1);
            graph.addEdge("A", "C", 100);
            graph.addEdge("B", "A", 100);
            graph.addEdge("B", "C", 1);
            graph.addEdge("C", "A", 1);
            graph.addEdge("C", "B", 100);
            const result = graph.findLongestHamiltonianPath();
            expect(result).not.toBeNull();
            // Should find the path with maximum total distance
            expect(result?.distance).toBeGreaterThan(0);
            expect(result?.path).toHaveLength(3);
        });

        it("should return null when no Hamiltonian path exists", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addNode("A");
            graph.addNode("B");
            // No edges, so no Hamiltonian path
            expect(graph.findLongestHamiltonianPath()).toBeNull();
        });

        it("should prefer longer paths over shorter ones", () => {
            const graph = new DirectedWeightedGraph<string>();
            // Path 1: A->B->C = 1+1 = 2
            // Path 2: A->C->B = 10+10 = 20
            // Hamiltonian paths visit all nodes exactly once (n-1 edges for n nodes)
            graph.addEdge("A", "B", 1);
            graph.addEdge("B", "C", 1);
            graph.addEdge("C", "A", 1);
            graph.addEdge("A", "C", 10);
            graph.addEdge("C", "B", 10);
            graph.addEdge("B", "A", 10);
            const result = graph.findLongestHamiltonianPath();
            expect(result?.distance).toBe(20); // A->C->B is longest
        });
    });

    describe("integration tests", () => {
        it("should handle complex real-world scenario", () => {
            const graph = new DirectedWeightedGraph<string>();
            // Create a graph representing cities and distances
            graph.addEdge("London", "Paris", 214);
            graph.addEdge("London", "Amsterdam", 334);
            graph.addEdge("Paris", "Amsterdam", 430);
            graph.addEdge("Paris", "London", 214);
            graph.addEdge("Amsterdam", "London", 334);
            graph.addEdge("Amsterdam", "Paris", 430);

            const shortest = graph.findShortestHamiltonianPath();
            const longest = graph.findLongestHamiltonianPath();

            expect(shortest).not.toBeNull();
            expect(longest).not.toBeNull();
            expect(shortest?.distance).toBeLessThanOrEqual(longest?.distance ?? 0);
            expect(shortest?.path).toHaveLength(3);
            expect(longest?.path).toHaveLength(3);
        });

        it("should handle graph with self-loops in Hamiltonian paths", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "A", 5); // Self-loop
            graph.addEdge("A", "B", 3);
            graph.addEdge("B", "A", 2);
            const paths = graph.findAllHamiltonianPaths();
            // Self-loops shouldn't create invalid Hamiltonian paths
            // Valid paths: A->B and B->A
            expect(paths.length).toBeGreaterThan(0);
            for (const path of paths) {
                expect(path.path).toHaveLength(2);
            }
        });

        it("should handle large weights correctly", () => {
            const graph = new DirectedWeightedGraph<string>();
            graph.addEdge("A", "B", Number.MAX_SAFE_INTEGER);
            graph.addEdge("B", "C", 1);
            const result = graph.shortestPath("A", "C");
            expect(result.distance).toBe(Number.MAX_SAFE_INTEGER + 1);
        });
    });
});
