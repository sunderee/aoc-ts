# Advent of Code in TypeScript

This is a collection of solutions to Advent of Code problems in TypeScript, running on Bun runtime engine.

## Usage

Puzzle inputs (and test inputs, if needed) are to be placed in the `data` directory, segmented by year (directory name) and day. For example:

```
data
├── 2015
│   ├── day01.txt
│   ├── day02.test.txt
│   ├── day02.txt
│   ├── day03.txt
│   ├── ...
└── 2025
    ├── day01.test.txt
    └── day01.txt
```

Install dependencies with `bun install`. Most utilities and solutions contain tests. To run them, use Bun's built-in test runner (`bun test`). Biome is used for formatting and linting (`bun run check`), and Husky for pre-commit hooks (runs both Biome checks and full test suite).

## Acknowledgements & Personal Message

I'd like to thank the author of [Advent of Code](https://adventofcode.com) for creating this fun annual event. Eric, you're a legend!

For me personally, the purpose of this repository is to store my solutions. For you, I don't know. The sole idea behind Advent of Code is to have fun, enjoy the fantastic (and oftentimes hilarious) storytelling, solve challenging puzzles in your favorite programming language, and enjoy the holiday season! It's a lovely and important part of the year for many of us, where we're reminded by the story of Christmas to be kind, generous, and compassionate to one another.

If you're interested, try it out! I wish you all a Merry Christmas (if you're reading this in December). Otherwise, and including December, take care and stay safe. Somebody out there loves you.