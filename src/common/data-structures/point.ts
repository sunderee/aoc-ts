export type Point2D = { x: number; y: number };

export function point2DCopy(current: Point2D, update: Point2D): Point2D {
	return { x: current.x + update.x, y: current.y + update.y } satisfies Point2D;
}

export class Point2DSet {
	private readonly points: Array<Point2D> = [];

	get length(): number {
		return this.points.length;
	}

	get size(): number {
		return this.points.length;
	}

	add(point: Point2D): void {
		if (!this.points.some((item) => item.x === point.x && item.y === point.y)) {
			this.points.push(point);
		}
	}

	has(point: Point2D): boolean {
		return this.points.some((item) => item.x === point.x && item.y === point.y);
	}

	delete(point: Point2D): boolean {
		const index = this.points.findIndex(
			(item) => item.x === point.x && item.y === point.y,
		);
		if (index !== -1) {
			this.points.splice(index, 1);
			return true;
		}
		return false;
	}
}
