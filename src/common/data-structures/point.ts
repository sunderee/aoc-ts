export type Point2D = { x: number; y: number };

export function point2DCopy(current: Point2D, update: Point2D): Point2D {
    return { x: current.x + update.x, y: current.y + update.y } satisfies Point2D;
}

export class Point2DSet {
    private readonly points: Set<string> = new Set();

    get length(): number {
        return this.points.size;
    }

    get size(): number {
        return this.points.size;
    }

    add(point: Point2D): void {
        this.points.add(this.pointToString(point));
    }

    has(point: Point2D): boolean {
        return this.points.has(this.pointToString(point));
    }

    delete(point: Point2D): boolean {
        return this.points.delete(this.pointToString(point));
    }

    private pointToString(point: Point2D): string {
        return `${point.x},${point.y}`;
    }
}

export class Point2DMap<T> {
    private readonly map: Map<string, T> = new Map();

    get size(): number {
        return this.map.size;
    }

    get(point: Point2D): T | undefined {
        return this.map.get(this.pointToString(point));
    }

    set(point: Point2D, value: T): void {
        this.map.set(this.pointToString(point), value);
    }

    has(point: Point2D): boolean {
        return this.map.has(this.pointToString(point));
    }

    delete(point: Point2D): boolean {
        return this.map.delete(this.pointToString(point));
    }

    keys(): Point2D[] {
        return Array.from(this.map.keys()).map(this.stringToPoint.bind(this));
    }

    values(): T[] {
        return Array.from(this.map.values());
    }

    entries(): Array<[Point2D, T]> {
        return Array.from(this.map.entries()).map(([key, value]) => [this.stringToPoint(key), value]);
    }

    private pointToString(point: Point2D): string {
        return `${point.x},${point.y}`;
    }

    private stringToPoint(str: string): Point2D {
        const [x, y] = str.split(",").map(Number);
        return { x: x ?? 0, y: y ?? 0 };
    }
}
