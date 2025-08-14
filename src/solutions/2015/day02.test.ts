import { describe, expect, it } from 'bun:test';
import { loadInput } from '../../common';
import { Day02Year2015 } from './day02';

describe("2015 day 02", () => {
    const solution = new Day02Year2015();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it('should solve first part', async () => {
        expect(solution.first('2x3x4')).toEqual(58)
        expect(solution.first('1x1x10')).toEqual(43)

        const testInput = await loadInput(2015, 2, true);
        expect(solution.first(testInput)).toEqual(58 + 43);
    });

    it('should solve second part', async () => {
        expect(solution.second('2x3x4')).toEqual(34);
        expect(solution.second('1x1x10')).toEqual(14);

        const testInput = await loadInput(2015, 2, true);
        expect(solution.second(testInput)).toEqual(34 + 14);
    });
});