Template for a solution:

```ts
import type { Solution } from "../../common";

export class DayXXYearYYYY implements Solution {
  first(input: string): number {
    return -1;
  }

  second(input: string): number {
    return -1;
  }
}
```

Template for a test:

```ts
import { describe, expect, it } from "bun:test";
import { DayXXYearYYYY } from "./dayXX";

describe("YYYY day 01", () => {
  const solution = new DayXXYearYYYY();

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
```
