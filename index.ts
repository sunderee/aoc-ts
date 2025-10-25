import { argv } from "bun";
import { loadInput, type Solution } from "./src/common";
import { Day01Year2015, Day02Year2015, Day03Year2015, Day04Year2015, Day05Year2015, Day06Year2015, Day07Year2015 } from "./src/solutions";

const SOLUTIONS: Record<number, Record<number, Solution>> = {
  2015: {
    1: new Day01Year2015(),
    2: new Day02Year2015(),
    3: new Day03Year2015(),
    4: new Day04Year2015(),
    5: new Day05Year2015(),
    6: new Day06Year2015(),
    7: new Day07Year2015(),
  },
};

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
        if (year >= 2015 && year <= 2024) {
          cliArguments.year = year;
        } else {
          console.error("Year must be between 2015 and 2024");
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
console.log(`Running solution for year ${year} and day ${day}`);

const solutionYear = SOLUTIONS[year];
if (solutionYear === undefined) {
  console.error("No solutions exist for this year yet");
  process.exit(1);
}

const solutionDay = solutionYear[day];
if (solutionDay === undefined) {
  console.error("No solutions exist for this day yet");
  process.exit(1);
}

const input = await loadInput(year, day);

// Special case for year 2015 day 7
if (year === 2015 && day === 7) {
  console.time("first part");
  const firstPartSolution = solutionDay.first(input, { targetWire: "a" });
  console.log(firstPartSolution);
  console.timeEnd("first part");

  console.time("second part");
  console.log(solutionDay.second(input, { targetWire: 'a', overrideTargetWire: 'b', overrideValue: firstPartSolution }));
  console.timeEnd("second part");
} else {
  console.time("first part");
  console.log(solutionDay.first(input));
  console.timeEnd("first part");

  console.time("second part");
  console.log(solutionDay.second(input));
  console.timeEnd("second part");
}


