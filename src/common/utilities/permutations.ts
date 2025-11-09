export function permutations<T extends number | string>(arr: T[]): T[][] {
    // Base case: empty array or single element
    if (arr.length <= 1) {
        return [arr];
    }

    const result: T[][] = [];

    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        if (current === undefined) {
            continue;
        }
        const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];

        // Recursively get permutations of remaining elements
        const remainingPerms = permutations(remaining);

        // Add current element to the front of each permutation
        for (const perm of remainingPerms) {
            result.push([current, ...perm]);
        }
    }

    return result;
}
