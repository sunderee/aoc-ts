import { argv } from "bun";

interface CLIArguments {
    year: number;
    day: number;
}

function parseArguments(): CLIArguments {
    const cliArguments = { year: 0, day: 0 } satisfies CLIArguments;

    let i = 2;
    while (i < argv.length) {
        const argument = argv[i];
        if (argument === "-y" || argument === "--year") {
            if (i + 1 < argv.length) {
                const year = parseInt(argv[++i] ?? "0");
                if (year >= 2015 && year <= 2025) {
                    cliArguments.year = year;
                } else {
                    console.error("Year must be between 2015 and 2025");
                    process.exit(1);
                }
            } else {
                console.error("Year value missing");
                process.exit(1);
            }
        } else if (argument === "-d" || argument === "--day") {
            if (i + 1 < argv.length) {
                const day = parseInt(argv[++i] ?? "0");
                if (day >= 1 && day <= 25) {
                    cliArguments.day = day;
                } else {
                    console.error("Day must be between 1 and 25");
                    process.exit(1);
                }
            } else {
                console.error("Day value missing");
                process.exit(1);
            }
        } else {
            console.error(`Unknown argument: ${argument}`);
            process.exit(1);
        }

        i++;
    }

    return cliArguments;
}

const { year, day } = parseArguments();
if (year === 0 || day === 0) {
    console.error("Usage: bun setup-solution.ts --year <year> --day <day>");
    process.exit(1);
}
console.log(`Setting up solution for year ${year} and day ${day}`);

// Create the solution and solution test files
const solutionPath = `./src/solutions/${year}/day${day.toString().padStart(2, "0")}.ts`;
const solutionTestPath = `./src/solutions/${year}/day${day.toString().padStart(2, "0")}.test.ts`;

const solutionExists = await Bun.file(solutionPath).exists();
const solutionTestExists = await Bun.file(solutionTestPath).exists();

if (!solutionExists) {
    Bun.write(solutionPath, `import type { Solution } from "../../common";

export class Day${day.toString().padStart(2, "0")}Year${year} implements Solution {
    first(input: string): number {
        return -1;
    }

    second(input: string): number {
        return -1;
    }
}`);
} else {
    console.error(`Solution file already exists: ${solutionPath}`);
    process.exit(1);
}

if (!solutionTestExists) {
    Bun.write(solutionTestPath, `import { describe, expect, it } from "bun:test";
import { Day${day.toString().padStart(2, "0")}Year${year} } from "./day${day.toString().padStart(2, "0")}";

describe("${year} day ${day.toString().padStart(2, "0")}", () => {
    const solution = new Day${day.toString().padStart(2, "0")}Year${year}();

    it("should be defined", () => {
        expect(solution).toBeDefined();
    });

    it("should solve first part", () => {
        expect(solution.first("")).toEqual(-1);
    });

    it("should solve second part", () => {
        expect(solution.second("")).toEqual(-1);
    });
});
`);
} else {
    console.error(`Test file already exists: ${solutionTestPath}`);
    process.exit(1);
}

console.log(`Solution and test files created successfully`);
console.log('Import the solution and test files into the index.ts file');