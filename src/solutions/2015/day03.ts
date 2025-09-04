import {
  point2DCopy,
  Point2DSet,
  toPairs,
  type Point2D,
  type Solution,
} from "../../common";

export class Day03Year2015 implements Solution {
  first(input: string): number {
    const visitedPoints = new Point2DSet();

    let currentPoint = { x: 0, y: 0 } satisfies Point2D;
    visitedPoints.add(currentPoint);

    for (const direction of input.split("")) {
      currentPoint = this.pointFromDirection(currentPoint, direction);
      visitedPoints.add(currentPoint);
    }

    return visitedPoints.length;
  }

  second(input: string): number {
    const visitedPoints = new Point2DSet();

    let currentPointSanta = { x: 0, y: 0 } satisfies Point2D;
    let currentPointRoboSanta = { x: 0, y: 0 } satisfies Point2D;
    visitedPoints.add(currentPointSanta);
    visitedPoints.add(currentPointRoboSanta);

    const directionPairs = toPairs(input.split(""));
    for (const pair of directionPairs) {
      currentPointSanta = this.pointFromDirection(
        currentPointSanta,
        pair.first,
      );
      currentPointRoboSanta = this.pointFromDirection(
        currentPointRoboSanta,
        pair.second,
      );

      visitedPoints.add(currentPointSanta);
      visitedPoints.add(currentPointRoboSanta);
    }

    return visitedPoints.length;
  }

  private pointFromDirection(current: Point2D, direction: string): Point2D {
    switch (direction) {
      case ">":
        return point2DCopy(current, { x: 0, y: 1 });
      case "v":
        return point2DCopy(current, { x: -1, y: 0 });
      case "<":
        return point2DCopy(current, { x: 0, y: -1 });
      case "^":
        return point2DCopy(current, { x: 1, y: 0 });
      default:
        throw new Error(`Invalid direction: ${direction}`);
    }
  }
}
