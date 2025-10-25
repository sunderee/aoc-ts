export function isNumber(value: unknown): boolean {
    return typeof value === "number" && !Number.isNaN(value);
}

export function isNumberString(value: string): boolean {
    if (value.trim() === "") {
        return false;
    }

    const num = Number(value);
    return !Number.isNaN(num);
}

export function safeParseNumber(value: string): number | undefined {
    if (value.trim() === "") {
        return undefined;
    }

    const num = Number(value);
    return Number.isNaN(num) ? undefined : num;
}