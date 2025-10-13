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
