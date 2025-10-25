import { describe, expect, it } from "bun:test";
import { isNumber, isNumberString, safeParseNumber } from "./number";

describe("isNumber", () => {
    it("should return true if the value is a number", () => {
        expect(isNumber(1)).toBe(true);
        expect(isNumber(0)).toBe(true);
        expect(isNumber(1.0)).toBe(true);
        expect(isNumber(0.0)).toBe(true);
        expect(isNumber(1.1)).toBe(true);
        expect(isNumber(0.1)).toBe(true);
        expect(isNumber(-1)).toBe(true);
        expect(isNumber(-1.1)).toBe(true);
        expect(isNumber(Infinity)).toBe(true);
        expect(isNumber(-Infinity)).toBe(true);
    });

    it("should return false if the value is not a number", () => {
        expect(isNumber("1")).toBe(false);
        expect(isNumber(NaN)).toBe(false);
        expect(isNumber(undefined)).toBe(false);
        expect(isNumber(null)).toBe(false);
        expect(isNumber(true)).toBe(false);
        expect(isNumber(false)).toBe(false);
        expect(isNumber("")).toBe(false);
        expect(isNumber("abc")).toBe(false);
        expect(isNumber({})).toBe(false);
        expect(isNumber([])).toBe(false);
    });
});

describe("isNumberString", () => {
    it("should return true for valid number strings", () => {
        expect(isNumberString("1")).toBe(true);
        expect(isNumberString("0")).toBe(true);
        expect(isNumberString("123")).toBe(true);
        expect(isNumberString("-123")).toBe(true);
        expect(isNumberString("123.456")).toBe(true);
        expect(isNumberString("-123.456")).toBe(true);
        expect(isNumberString("0.1")).toBe(true);
        expect(isNumberString(".5")).toBe(true);
        expect(isNumberString("-0.5")).toBe(true);
    });

    it("should return false for invalid number strings", () => {
        expect(isNumberString("")).toBe(false);
        expect(isNumberString("   ")).toBe(false);
        expect(isNumberString("abc")).toBe(false);
        expect(isNumberString("12abc")).toBe(false);
        expect(isNumberString("abc12")).toBe(false);
    });
});

describe("safeParseNumber", () => {
    it("should parse valid number strings", () => {
        expect(safeParseNumber("1")).toBe(1);
        expect(safeParseNumber("0")).toBe(0);
        expect(safeParseNumber("123")).toBe(123);
        expect(safeParseNumber("-123")).toBe(-123);
        expect(safeParseNumber("123.456")).toBe(123.456);
        expect(safeParseNumber("-123.456")).toBe(-123.456);
        expect(safeParseNumber("0.1")).toBe(0.1);
        expect(safeParseNumber(".5")).toBe(0.5);
        expect(safeParseNumber("-0.5")).toBe(-0.5);
    });

    it("should return undefined for invalid strings", () => {
        expect(safeParseNumber("")).toBeUndefined();
        expect(safeParseNumber("   ")).toBeUndefined();
        expect(safeParseNumber("abc")).toBeUndefined();
        expect(safeParseNumber("12abc")).toBeUndefined();
        expect(safeParseNumber("abc12")).toBeUndefined();
    });
});
