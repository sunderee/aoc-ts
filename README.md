# Advent of Code in TypeScript

This is a collection of solutions to Advent of Code problems in TypeScript.

Usage: make sure you have Bun (`https://bun.sh`) installed on your system. Setup a directory with all the inputs (and potentially test inputs), as shown in the figure below:

```
├── data
│   └── 2015
│       ├── day01.txt
│       ├── day02.test.txt
│       └── day02.txt
...
```

Install dependencies using `bun install`. Run a solution by providing `-y/--year` and `-d/--day` CLI arguments:

```bash
bun run index.ts --year 2015 --day 1
```

You can run tests with `bun test`.