import { describe, expect, it } from "bun:test";
import { type Point2D, Point2DSet, point2DCopy } from "./point";

describe("Point2D", () => {
    describe("point2DCopy", () => {
        it("should correctly copy Point2D", () => {
            const originalPoint = { x: 69, y: 420 } satisfies Point2D;
            const copiedPoint = point2DCopy(originalPoint, { x: -44, y: 8580 });
            expect(copiedPoint).toEqual({ x: 25, y: 9000 });
        });

        it("should handle negative coordinates", () => {
            const originalPoint = { x: -10, y: -20 } satisfies Point2D;
            const copiedPoint = point2DCopy(originalPoint, { x: -5, y: 10 });
            expect(copiedPoint).toEqual({ x: -15, y: -10 });
        });

        it("should handle zero updates", () => {
            const originalPoint = { x: 5, y: 10 } satisfies Point2D;
            const copiedPoint = point2DCopy(originalPoint, { x: 0, y: 0 });
            expect(copiedPoint).toEqual({ x: 5, y: 10 });
        });
    });

    describe("Point2DSet", () => {
        it("should ensure that only unique values are added", () => {
            const set = new Point2DSet();
            set.add({ x: 0, y: 0 });
            set.add({ x: 0, y: 1 });
            set.add({ x: 1, y: 0 });
            set.add({ x: 2, y: 0 });
            set.add({ x: 0, y: 0 });
            expect(set.length).toEqual(4);
        });

        it("should handle empty set", () => {
            const set = new Point2DSet();
            expect(set.length).toEqual(0);
        });

        it("should handle negative coordinates", () => {
            const set = new Point2DSet();
            set.add({ x: -1, y: -1 });
            set.add({ x: -1, y: -1 });
            set.add({ x: 0, y: -1 });
            expect(set.length).toEqual(2);
        });

        it("should handle large numbers", () => {
            const set = new Point2DSet();
            set.add({ x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER });
            set.add({ x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER });
            expect(set.length).toEqual(1);
        });
    });
});
