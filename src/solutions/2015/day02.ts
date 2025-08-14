import type { Solution } from "../../common";

export class Day02Year2015 implements Solution {
    first(input: string): number {
        return input.split('\n')
            .filter((item) => item.trim().length > 0)
            .map((item) => this.getWrappingPaperSize(item))
            .reduce((previous, current) => previous + current, 0);
    }

    second(input: string): number {
        return input.split('\n')
            .filter((item) => item.trim().length > 0)
            .map((item) => this.getRibbonLength(item))
            .reduce((previous, current) => previous + current, 0);
    }

    private getWrappingPaperSize(line: string): number {
        const parts = line.split('x');
        if (parts.length !== 3) {
            console.warn(`Could not split input ${line} into three parts`);
            return 0;
        }

        const [length, width, height] = [
            parseInt(parts[0] ?? '0'),
            parseInt(parts[1] ?? '0'),
            parseInt(parts[2] ?? '0'),
        ]

        const surfaceArea = [
            2 * length * width,
            2 * width * height,
            2 * height * length
        ].reduce((previous, current) => previous + current, 0);

        const slack = Math.min(length * width, width * height, height * length);

        return surfaceArea + slack;
    }

    private getRibbonLength(line: string): number {
        const parts = line.split('x');
        if (parts.length !== 3) {
            console.warn(`Could not split input ${line} into three parts`);
            return 0;
        }

        const [length, width, height] = [
            parseInt(parts[0] ?? '0'),
            parseInt(parts[1] ?? '0'),
            parseInt(parts[2] ?? '0'),
        ];

        const present = Math.min(
            2 * (length + width),
            2 * (width + height),
            2 * (height + length)
        );
        const bow = length * width * height;

        return present + bow;
    }
}