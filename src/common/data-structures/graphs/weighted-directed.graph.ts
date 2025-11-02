export type DirectedGraphNodeID = string | number;

export class DirectedWeightedGraph<K extends DirectedGraphNodeID> {
    private readonly adjacency: Map<K, Map<K, number>> = new Map();

    addNode(id: K): void {
        if (!this.adjacency.has(id)) {
            this.adjacency.set(id, new Map());
        }
    }

    addEdge(from: K, to: K, weight: number): void {
        if (!this.adjacency.has(from)) {
            this.addNode(from);
        }

        if (!this.adjacency.has(to)) {
            this.addNode(to);
        }

        this.adjacency.get(from)?.set(to, weight);
    }

    getNodes(): K[] {
        return Array.from(this.adjacency.keys());
    }

    getEdgeWeight(from: K, to: K): number | undefined {
        return this.adjacency.get(from)?.get(to);
    }

    shortestPath(start: K, goal: K): { distance: number; path: K[] } {
        const distances = new Map<K, number>();
        const previous = new Map<K, K | null>();
        const visited = new Set<K>();

        for (const node of this.adjacency.keys()) {
            distances.set(node, Infinity);
            previous.set(node, null);
        }
        distances.set(start, 0);

        const queue = new Set(this.adjacency.keys());

        while (queue.size > 0) {
            let current: K | null = null;
            let minimumDistance = Infinity;

            for (const node of queue) {
                const distance = distances.get(node);
                if (distance === undefined) {
                    console.error(`Could not find distance for ${node}`);
                    continue;
                }

                if (distance < minimumDistance) {
                    minimumDistance = distance;
                    current = node;
                }
            }

            if (current === null) {
                break;
            }

            if (current === goal) {
                break;
            }

            queue.delete(current);
            visited.add(current);

            const currentCandidate = this.adjacency.get(current);
            if (currentCandidate === undefined) {
                console.error(`Cannot find ${current} in ${this.adjacency}`);
                continue;
            }
            for (const [neighbor, weight] of currentCandidate) {
                if (visited.has(neighbor)) {
                    continue;
                }

                const alternative = (distances.get(current) ?? 0) + weight;
                if (alternative < (distances.get(neighbor) ?? 0)) {
                    distances.set(neighbor, alternative);
                    previous.set(neighbor, current);
                }
            }
        }

        const path: K[] = [];
        let currentPath: K | null = goal;
        while (currentPath !== null) {
            path.unshift(currentPath);
            currentPath = previous.get(currentPath) ?? null;
        }

        return {
            distance: distances.get(goal) ?? 0,
            path,
        };
    }

    findAllHamiltonianPaths(): Array<{ path: K[]; distance: number }> {
        const nodes = this.getNodes();
        if (nodes.length === 0) {
            return [];
        }

        const paths: Array<{ path: K[]; distance: number }> = [];
        const permutations = this.generatePermutations(nodes);

        for (const permutation of permutations) {
            const distance = this.calculatePathDistance(permutation);
            if (distance !== Infinity) {
                paths.push({ path: permutation, distance });
            }
        }

        return paths;
    }

    findShortestHamiltonianPath(): { path: K[]; distance: number } | null {
        const allPaths = this.findAllHamiltonianPaths();
        if (allPaths.length === 0) {
            return null;
        }

        let shortest = allPaths[0];
        if (shortest === undefined) {
            return null;
        }

        for (const path of allPaths) {
            if (path.distance < shortest.distance) {
                shortest = path;
            }
        }
        return shortest;
    }

    findLongestHamiltonianPath(): { path: K[]; distance: number } | null {
        const allPaths = this.findAllHamiltonianPaths();
        if (allPaths.length === 0) {
            return null;
        }

        let longest = allPaths[0];
        if (longest === undefined) {
            return null;
        }

        for (const path of allPaths) {
            if (path.distance > longest.distance) {
                longest = path;
            }
        }
        return longest;
    }

    private generatePermutations<T>(arr: T[]): T[][] {
        if (arr.length <= 1) {
            return [arr];
        }

        const result: T[][] = [];
        for (let i = 0; i < arr.length; i++) {
            const current = arr[i];
            if (current === undefined) {
                continue;
            }
            const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
            const restPerms = this.generatePermutations(rest);
            for (const perm of restPerms) {
                result.push([current, ...perm]);
            }
        }
        return result;
    }

    private calculatePathDistance(path: K[]): number {
        let totalDistance = 0;
        for (let i = 0; i < path.length - 1; i++) {
            const from = path[i];
            const to = path[i + 1];
            if (from === undefined || to === undefined) {
                return Infinity;
            }
            const distance = this.getEdgeWeight(from, to);
            if (distance === undefined) {
                return Infinity;
            }
            totalDistance += distance;
        }
        return totalDistance;
    }
}
