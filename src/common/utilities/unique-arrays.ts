export function uniqueArrays<T>(arrays: T[][]): T[][] {
    const seen = new Set<string>();
    const result: T[][] = [];

    for (const arr of arrays) {
        const key = JSON.stringify(arr);
        if (!seen.has(key)) {
            seen.add(key);
            result.push(arr);
        }
    }

    return result;
}
