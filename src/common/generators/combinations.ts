export function* combinations<T>(arr: T[]): Generator<T[], void> {
    const n = arr.length;
    for (let mask = 0; mask < 1 << n; mask++) {
        const combo: T[] = [];
        for (let i = 0; i < n; i++) {
            const element = arr[i];
            if (element === undefined) {
                continue;
            }

            if (mask & (1 << i)) {
                combo.push(element);
            }
        }

        yield combo;
    }
}
