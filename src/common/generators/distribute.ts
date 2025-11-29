export function* distribute(n: number, total: number): Generator<number[]> {
    if (n < 1) return;
    if (n === 1) {
        yield [total];
        return;
    }

    for (let i = 0; i <= total; i++) {
        for (const rest of distribute(n - 1, total - i)) {
            yield [i, ...rest];
        }
    }
}
